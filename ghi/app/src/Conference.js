import React, { useEffect, useState } from "react";

function ConferenceForm() {
  const [locations, setLocations] = useState([]);
  const [starts, setStarts] = useState("");
  const [ends, setEnds] = useState("");
  const [description, setDescription] = useState("");
  const [max_presentations, setMaxPresentations] = useState("");
  const [max_attendees, setMaxAttendees] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };
  const handleStartsChange = (event) => {
    const value = event.target.value;
    setStarts(value);
  };
  const handleEndsChange = (event) => {
    const value = event.target.value;
    setEnds(value);
  };
  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };
  const handleMaxPresentationsChange = (event) => {
    const value = event.target.value;
    setMaxPresentations(value);
  };
  const handleMaxAttendeesChange = (event) => {
    const value = event.target.value;
    setMaxAttendees(value);
  };
  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.name = name;
    data.location = location;
    data.starts = starts;
    data.ends = ends;
    data.description = description;
    data.max_presentations = max_presentations;
    data.max_attendees = max_attendees;
    console.log(data);

    const conferenceUrl = "http://localhost:8000/api/conferences/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(conferenceUrl, fetchConfig);
    if (response.ok) {
      const newConference = await response.json();
    }
  };

  const fetchData = async () => {
    const url = "http://localhost:8000/api/locations/";

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a new conference</h1>
          <form onSubmit={handleSubmit} id="create-location-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleNameChange}
                placeholder="Name"
                required
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={name}
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleStartsChange}
                placeholder="Starts"
                required
                type="date"
                id="starts"
                name="starts"
                className="form-control"
                value={starts}
              />
              <label htmlFor="starts">Starts</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleEndsChange}
                placeholder="Ends"
                required
                type="date"
                id="ends"
                name="ends"
                className="form-control"
                value={ends}
              />
              <label htmlFor="ends">Ends</label>
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Description
              </label>
              <textarea
                onChange={handleDescriptionChange}
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={description}
              ></textarea>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleMaxPresentationsChange}
                placeholder="Max Presentations"
                required
                type="number"
                id="max_presentations"
                name="max_presentations"
                className="form-control"
                value={max_presentations}
              />
              <label htmlFor="max_presentations">Max Presentations</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleMaxAttendeesChange}
                placeholder="Max Attendees"
                required
                type="number"
                id="max_attendees"
                name="max_attendees"
                className="form-control"
                value={max_attendees}
              />
              <label htmlFor="max_attendees">Max Attendees</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleLocationChange}
                required
                id="location"
                name="location"
                className="form-select"
                value={location}
              >
                <option value="">Choose a location</option>
                {locations.map((location) => {
                  return (
                    <option key={location.id} value={location.id}>
                      {location.name}
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

export default ConferenceForm;
