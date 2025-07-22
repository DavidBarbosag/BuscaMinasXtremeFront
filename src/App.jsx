import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JoinRoom from './pages/JoinRoom';
import CreateRoom from './pages/CreateRoom';
import './App.css'
import GamePage from './pages/GamePage';
import VoiceCallPage from './pages/VoiceCallPage';
import LostLobby from './pages/LostLobby';

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<JoinRoom />} />
          <Route path="/create" element={<CreateRoom />} />
          <Route path="/game/:gameId" element={<GamePage />} />
          <Route path="/voicecall" element={<VoiceCallPage />} />
            <Route path="/lost-lobby" element={<LostLobby />} />
      </Routes>
  );
}

export default App
