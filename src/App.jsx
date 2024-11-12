import './views/styles/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/components/login';
import Nav from './views/components/navigation';
import Cadastre from './views/components/cadastre'; // Supondo que você tenha uma página de cadastro
import Home from './views/components/home';
import Pesquisa from './views/components/pesquisa';
import Chat from './views/components/chat';

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastre" element={<Cadastre />} />
          <Route path="/home" element={<Home />} />
          <Route path="/pesquisa" element={<Pesquisa />}/>
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;