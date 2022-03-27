import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import NetworkGraph from './Components/NetworkGraph/NetworkGraph';

import {Col, Container, Row, Stack} from 'react-bootstrap';
import AddDevice from './Components/AddDevice/AddDevice';
import DeleteDevice from './Components/DeleteDevice/DeleteDevice';

function App() {
  return (
    <Container className='mt-4'>
      <Row style={{columnGap : '150px'}}>
        <Col>
          <AddDevice />
        </Col>
        <Col>
          <DeleteDevice/>
        </Col>
      </Row>
      <Row xl={'xl-6'} style={{'margin-top' : '50px'}}>
        <NetworkGraph />
      </Row>
    </Container>
  );
}

export default App;
