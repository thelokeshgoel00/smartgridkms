import React from "react";

const DeleteConsumer = () => {
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
          />
          {/* Group Private Key */}
          <label htmlFor="groupPrivateKey">Group Private Key</label>
          <input
            type="password"
            className="form-control"
            id="groupPrivateKey"
            placeholder="Group Private Key"
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteConsumer;
