import './App.css';
import AddConsumer from './Components/AddConsumer/AddConsumer';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteConsumer from './Components/DeleteConsumer/DeleteConsumer';
import NetworkGraph from './Components/NetworkGraph/NetworkGraph';

import {Col, Container, Row, Stack} from 'react-bootstrap';

function App() {
  return (
    // <Container>
    //   <Row>
    //     <Col>
    //   <AddConsumer />
    //   </Col>
    //   <Col>
    //   <DeleteConsumer/>
    //   </Col>
    //   </Row>
    //   <Row xl={'xl-6'}>
    //   <NetworkGraph />
    //   </Row>
    // </Container>
    <Stack>
      <Stack direction='horizontal'>
        <AddConsumer />
        <DeleteConsumer/>
      </Stack>
      <NetworkGraph />
    </Stack>
  );
}

export default App;
