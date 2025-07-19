import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import CreateRoom from './pages/CreateRoom';
import './App.css'
import GamePage from './pages/GamePage';

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<JoinRoom />} />
          <Route path="/create" element={<CreateRoom />} />
          <Route path="/game/:gameId" element={<GamePage />} />
      </Routes>
  );
}

export default App
