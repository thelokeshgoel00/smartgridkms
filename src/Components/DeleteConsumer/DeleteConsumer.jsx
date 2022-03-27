import React from "react";
import axios from "axios";

const DeleteConsumer = () => {
  const [consumer, setConsumer] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      deviceId: consumer,
    };
    axios
      .post("http://localhost:5000/remove", data)
      .then((res) => console.log(res.data));
  };

  return (
    <div className="form-container">
      <h1>Delete Consumer</h1>
      <form>
        <div className="form-group">
          {/* consumer id */}
          <label htmlFor="consumerId">Consumer ID</label>
          <input
            type="text"
            className="form-control"
            id="consumerId"
            placeholder="Consumer ID"
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

export default DeleteConsumer;
