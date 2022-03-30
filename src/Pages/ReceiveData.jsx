import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { BACKEND_URL } from "../Config";

const ReceiveData = () => {
  const [dataType, setDataType] = useState("");
  const [receivedData, setReceivedData] = useState("");
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const [dropdownData, setDropdownData] = useState([]);
  const [privateKey, setPrivateKey] = useState("");
  const [dropdownSelected, setDropdownSelected] = useState("");
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/data`)
      .then((req, res) => {
        setDropdownData(req.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(receivedData, isDataAvailable);
  }, [isDataAvailable]);

  return (
    <Container>
      <h1>Receive Data</h1>
      {dataType === "" && (
        <Stack direction="horizontal" style={{ marginTop: "30px" }}>
          <Button
            variant="primary"
            style={{ marginRight: "50px" }}
            onClick={() => setDataType("meter")}
          >
            Receive Data at Smart Meter
          </Button>
          <Button variant="primary" onClick={() => setDataType("device")}>
            Receive Data at Device Node
          </Button>
        </Stack>
      )}
      {dataType === "meter" && (
        <>
          <h3> Smart Meter from Device</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = {
                sender: "smart meter",
                receiver: dropdownSelected,

                privateKey: privateKey,
              };
              axios
                .post(`${BACKEND_URL}/receive`, data)
                .then((res) => {
                  console.log(res);
                  if (res.data.status === 201) {
                    setReceivedData(res.data.data);
                    setIsDataAvailable(true);
                    alert("data received successfully");
                  } else {
                    alert("error receiving data");
                  }
                })
                .catch((err) => {
                  console.log(err);
                  alert("error receiving data");
                });
            }}
          >
            <div className="form-group" style={{ marginTop: "10px" }}>
              <label name="SelectSendingDevice">Select Sending Device</label>
              <select
                className="form-control form-control-lg"
                onChange={(e) => {
                  setDropdownSelected(e.target.value);
                }}
                required
                defaultValue={dropdownSelected}
              >
                <option disabled value="">
                  {" "}
                  -- select a device --{" "}
                </option>
                {dropdownData.map((item) => (
                  <option key={item.device_id} value={item.device_id}>
                    {item.device_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label name="privateKey" htmlFor="privateKey">
                Enter Private Key of device
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                required
                onChange={(e) => setPrivateKey(e.target.value)}
              ></textarea>
            </div>

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Receive Data
            </Button>
          </form>
        </>
      )}
      {dataType === "device" && (
        <>
          <h3> Device from Smart Meter</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = {
                sender: "smart meter",
                receiver: dropdownSelected,
                privateKey: privateKey,
              };
              axios
                .post(`${BACKEND_URL}/receive`, data)
                .then((res) => {
                  console.log(res);
                  if (res.data.status === 201) {
                    setReceivedData(res.data.data);
                    setIsDataAvailable(true);
                    alert("data received successfully");
                  } else {
                    alert("error receiving data");
                  }
                })
                .catch((err) => {
                  console.log(err);
                  alert("error receiving data");
                });
            }}
          >
            <div className="form-group" style={{ marginTop: "10px" }}>
              <label name="SelectReceivingDevice">
                Select Receiving Device
              </label>
              <select
                className="form-control form-control-lg"
                onChange={(e) => {
                  setDropdownSelected(e.target.value);
                }}
                required
                defaultValue={dropdownSelected}
              >
                <option disabled value="">
                  {" "}
                  -- select a device --{" "}
                </option>
                {dropdownData.map((item) => (
                  <option key={item.device_id} value={item.device_id}>
                    {item.device_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label name="privateKey" htmlFor="privateKey">
                Enter Private Key of device
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                required
                onChange={(e) => setPrivateKey(e.target.value)}
              ></textarea>
            </div>

            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Receive Data
            </Button>
          </form>
        </>
      )}
      {receivedData !== "" && (
        <div className="form-group" style={{ marginTop: "30px" }}>
          <label> Decrypted Data </label>
          <textarea rows="5" className="form-control">
            {receivedData}
          </textarea>
        </div>
      )}
    </Container>
  );
};

export default ReceiveData;
