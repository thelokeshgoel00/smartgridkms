import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import AddDevice from "../Components/AddDevice/AddDevice";
import DeleteDevice from "../Components/DeleteDevice/DeleteDevice";
import NavbarComponent from "../Components/NavbarComponent/NavbarComponent";
import NetworkGraph from "../Components/NetworkGraph/NetworkGraph";

const Home = () => {
  return (
    <Container className="mt-4">
      <Row style={{ columnGap: "150px" }}>
        <Col>
          <AddDevice />
        </Col>
        <Col>
          <DeleteDevice />
        </Col>
      </Row>
      <Row xl={"xl-6"} style={{ marginTop: "50px" }}>
        <NetworkGraph />
      </Row>
    </Container>
  );
};

export default Home;
