import React from "react";

const AddConsumer = () => {
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
            placeholder="Consumer Name"
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddConsumer;
