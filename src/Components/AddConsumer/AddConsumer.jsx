import React from "react";
import axios from "axios";
import uuid from "react-uuid";

const AddConsumer = () => {
  const [consumer, setConsumer] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      deviceId: uuid(),
      deviceName: consumer,
    };
    console.log(data);
    axios
      .post("http://localhost:5000/add", data)
      .then((res) => console.log(res.data));
  };

  return (
    <div className="form-container">
      <h1>Add Consumer</h1>
      <form>
        <div className="form-group">
          <label htmlFor="consumerName">Consumer Name</label>
          <input
            type="text"
            className="form-control"
            id="consumerName"
            name="consumerName"
            placeholder="Consumer Name"
            onChange={(e) => setConsumer(e.target.value)}
          />
          <button type="submit" className="btn btn-primary" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddConsumer;
