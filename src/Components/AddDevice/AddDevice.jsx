import React from "react";
import axios from "axios";
import uuid from "react-uuid";
import { BACKEND_URL } from "../../Config";

const AddDevice = () => {
  const [device, setDevice] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      deviceId: uuid(),
      deviceName: device,
    };
    console.log(data);
    axios.post(`${BACKEND_URL}/add`, data).then((res) => console.log(res.data));
    window.location.reload();
  };

  return (
    <div className="form-container">
      <h1>Add device</h1>
      <form>
        <div className="form-group">
          <label htmlFor="deviceName">Device Name</label>
          <input
            type="text"
            className="form-control"
            id="deviceName"
            name="deviceName"
            placeholder="Device Name"
            onChange={(e) => setDevice(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary mt-3"
            onClick={onSubmit}
          >
            Add Device
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDevice;
