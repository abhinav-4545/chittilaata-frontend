import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import "../utils/ui.css";

function Lobby() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [phase, setPhase] = useState("");
  const [error, setError] = useState("");

  async function fetchGame() {
    try {
      const data = await apiRequest(`/game/${gameId}`);
      setPlayers(data.players || []);
      setPhase(data.currentPhase);

      if (data.currentPhase === "IN_PROGRESS") {
        navigate(`/round/${gameId}`);

      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function startGame() {
    try {
      setError("");
      await apiRequest(`/game/${gameId}/start`, {
        method: "POST",
      });
      // auto refresh will redirect everyone
    } catch (err) {
      setError(err.message);
    }
  }

  // 🔁 AUTO REFRESH
  useEffect(() => {
    fetchGame();
    const interval = setInterval(fetchGame, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="title">🧾 ChittiLaata – Lobby</div>

      <p style={{ textAlign: "center", fontSize: "18px" }}>
        Waiting for players to join…
      </p>

      <div className="lobby-grid">
        {players.map((p) => (
          <div key={p.id} className="lobby-paper">
            {p.name}
          </div>
        ))}
      </div>

      <button className="start-btn" onClick={startGame}>
        🎉 Start Game
      </button>

      {error && <p className="message-error">{error}</p>}
    </div>
  );
}

export default Lobby;
