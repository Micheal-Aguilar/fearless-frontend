import React, { useEffect, useState } from "react";

function PresentationForm() {
  const [presenter_name, setPresenterName] = useState("");
  const [presenter_email ,setPresenterEmail] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [conferences, setConferences] = useState([]);
  const [conference, setConference] = useState("");

  const handlePresenterNameChange = (event) => {
    const value = event.target.value;
    setPresenterName(value);
  };
  const handlePresenterEmailChange = (event) => {
    const value = event.target.value;
    setPresenterEmail(value);
  };
  const handleCompanyNameChange = (event) => {
    const value = event.target.value;
    setCompanyName(value);
  };
  const handleTitleChange = (event) => {
    const value = event.target.value;
    setTitle(value);
  };
  const handleConferenceChange = (event) => {
    const value = event.target.value;
    setConference(value);
  };
  const handleSynopsisChange = (event) => {
    const value = event.target.value;
    setSynopsis(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.presenter_name = presenter_name;
    data.presenter_email = presenter_email;
    data.company_name = company_name;
    data.title = title;
    data.conference = conference;
    data.synopsis = synopsis;
    console.log(data);

    const presentationUrl = "http://localhost:8000/api/conferences/1/presentations/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(presentationUrl, fetchConfig);
    if (response.ok) {
      const newPresentation= await response.json();
    }
  };

  const fetchData = async () => {
    const url = "http://localhost:8000/api/conferences/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setConferences(data.conferences);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new Presentation</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input
                onChange={handlePresenterNameChange}
                placeholder="Presenter-name"
                required
                type="text"
                id="Presenter-name"
                name="presenter_name"
                className="form-control"
                value={presenter_name}
              />
              <label htmlFor="name">Presenter Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handlePresenterEmailChange}
                placeholder="email"
                required
                type="email"
                id="email"
                name="presenter_email"
                className="form-control"
                value={presenter_email}
              />
              <label htmlFor="email">Presenter email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleCompanyNameChange}
                placeholder="Company-name"
                type="text"
                id="Company-name"
                name="company_name"
                className="form-control"
                value={company_name}
              />
              <label htmlFor="name">Company Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
              onChange={handleTitleChange}
                placeholder="Title"
                required
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={title}
              />
              <label htmlFor="title">Title</label>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Synopsis
              </label>
              <textarea
                onChange={handleSynopsisChange}
                className="form-control"
                id="synopsis"
                name="synopsis"
                rows="3"
                value={synopsis}
              ></textarea>
            </div>
            <div className="mb-3">
              <select
                onChange={handleConferenceChange}
                required
                id="conferences"
                name="conferences"
                className="form-select"
                value={conference}
              >
                <option value="">Choose a conference</option>
                {conferences.map((conference) => {
                  return (
                    <option key={conference.id} value={conference.id}>
                      {conference.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PresentationForm;
