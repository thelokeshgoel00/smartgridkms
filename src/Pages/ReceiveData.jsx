import React, { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";

const ReceiveData = () => {
  const [dataType, setDataType] = useState("");
  const [receivedData, setReceivedData] = useState("");
  const [isDataAvailable, setIsDataAvailable] = useState(false);
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
          <form>
            <div className="form-group" style={{ marginTop: "10px" }}>
              <label name="SelectSendingDevice">Select Sending Device</label>
              <select class="form-control form-control-lg">
                <option>Large select</option>
                <option>next select</option>
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
          <form>
            <div className="form-group" style={{ marginTop: "10px" }}>
              <label name="SelectReceivingDevice">
                Select Receiving Device
              </label>
              <select class="form-control form-control-lg">
                <option>Large select</option>
                <option>next select</option>
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
          {isDataAvailable && (
            <>
              <label> Decrypted Data </label>
              <textarea rows="5"></textarea>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ReceiveData;
