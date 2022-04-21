import React from "react";
import axios from "axios";
import { BACKEND_URL } from "../../Config";

const DeleteDevice = () => {
  const [deviceId, setDeviceId] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      deviceId: deviceId,
    };
    axios
      .post(`${BACKEND_URL}/remove`, data)
      .then((res) => console.log(res.data));
    window.location.reload();
  };

  return (
    <div className="form-container">
      <h1>Delete device</h1>
      <form>
        <div className="form-group">
          {/* device id */}
          <label htmlFor="deviceId">Device ID</label>
          <input
            type="text"
            className="form-control"
            id="deviceId"
            placeholder="Device ID"
            onChange={(e) => setDeviceId(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary mt-3"
            onClick={onSubmit}
          >
            Delete Device
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteDevice;
