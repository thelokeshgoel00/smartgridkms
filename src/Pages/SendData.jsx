import React, { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";

const SendData = () => {
  const [dataType, setDataType] = useState("");

  return (
    <Container>
      <h1>Send Data</h1>
      {dataType === "" && (
        <Stack direction="horizontal" style={{ marginTop: "30px" }}>
          <Button
            variant="primary"
            style={{ marginRight: "50px" }}
            onClick={() => setDataType("meter")}
          >
            Send Data from Smart Meter
          </Button>
          <Button variant="primary" onClick={() => setDataType("device")}>
            Send Data from Device Node
          </Button>
        </Stack>
      )}
      {dataType === "meter" && (
        <>
          <h3> Smart Meter To Device</h3>
          <form>
            <div className="form-group">
              <label name="message" htmlFor="message">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
              ></textarea>
            </div>
            <div className="form-group" style={{ marginTop: "10px" }}>
              <label name="SelectReceivingDevice">
                Select Receiving Device
              </label>
              <select class="form-control form-control-lg">
                <option>Large select</option>
                <option>next select</option>
              </select>
            </div>
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Send Data
            </Button>
          </form>
        </>
      )}
      {dataType === "device" && (
        <>
          <h3> Device To Smart Meter</h3>
          <form>
            <div className="form-group">
              <label name="message" htmlFor="message">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
              ></textarea>
            </div>
            <div className="form-group" style={{ marginTop: "10px" }}>
              <label name="SelectSendingDevice">Select Sending Device</label>
              <select class="form-control form-control-lg">
                <option>Large select</option>
                <option>next select</option>
              </select>
            </div>
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Send Data
            </Button>
          </form>
        </>
      )}
    </Container>
  );
};

export default SendData;
