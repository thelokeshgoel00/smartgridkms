import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import SendData from './Pages/SendData';
import ReceiveData from './Pages/ReceiveData';
import NavbarComponent from './Components/NavbarComponent/NavbarComponent';



function App() {
  return (
    <main>
      <NavbarComponent />
      <Routes basename="/">
        <Route exact path="/" element={<Home />} />
        <Route path="/send" element={<SendData />} />
        <Route path="/receive" element={<ReceiveData />} />
      </Routes>

    </main>
  );
}

export default App;
