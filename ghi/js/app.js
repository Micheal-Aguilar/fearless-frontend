function createCard(name, description, pictureUrl, start,end, locationName) {
  return `
    <div class="card">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${locationName}</h6>
        <p class="card-text">${description}</p>
      </div>
      <div class= "card-footer text-body-secondary">
        ${start} - ${end}
      </div>
    </div>
  `;
}

function alert(message){
  const alertTag = document.getElementById("alertPlaceholder");
  alertTag.innerHTML =
  '<div class = "alert alert-danger alert-dismissable" role="alert" >' + message + ' <button type="button" class="btn-close" data-bs-dimiss="alert" aria-label = "Close"></button> </div>'

}

window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences/";

  try {
    const response = await fetch(url);

    if (!response.ok) {

      alert(
      `response is not okay, here is the current resposne: ${response} and its status ${response.status}`
    )
      };
    else {
      const data = await response.json();
      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const title = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const start = new Date(details.conference.starts).toLocaleDateString();
          const end = new Date(details.conference.ends).toLocaleDateString();
          const locationName = details.conference.location.name;
          const html = createCard(title, description, pictureUrl, start, end, locationName);
          const col = document.createElement("div");
          col.className = "col-4 my-3 shadow";
          col.innerHTML += html;
          const row = document.querySelector(".row");
          row.appendChild(col);

        }
      }
    }
  } catch (e) {
    alert(e);
  }
});
