import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateGame from "./pages/CreateGame";
import JoinGame from "./pages/JoinGame";
import Lobby from "./pages/Lobby";
import PlayGame from "./pages/PlayGame";
import Standings from "./pages/Standings";
import RoundStart from "./pages/RoundStart";
import FinalPage from "./pages/FinalPage";



function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<CreateGame />} />
        <Route path="/join/:gameId" element={<JoinGame />} />
        <Route path="/lobby/:gameId" element={<Lobby />} />
        <Route path="/play/:gameId" element={<PlayGame />} />
        <Route path="/standings/:gameId" element={<Standings />} />
        <Route path="/round/:gameId" element={<RoundStart />} />
        <Route path="/final/:gameId" element={<FinalPage />} />




      </Routes>
    </BrowserRouter>
  );
}

export default App;
