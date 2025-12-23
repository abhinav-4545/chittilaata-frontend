import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "../services/api";
import "../utils/ui.css";

function JoinGame() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function joinGame() {
    try {
      setError("");

      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }

      const playerId = Math.floor(Math.random() * 1_000_000_000);

      await apiRequest(`/game/${gameId}/join`, {
        method: "POST",
        body: JSON.stringify({
          id: playerId,
          name: name.trim(),
        }),
      });

      localStorage.setItem("playerId", playerId);
      navigate(`/lobby/${gameId}`);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="join-wrapper">
      <div className="join-card">
        <div className="join-title">✍️ Join Game</div>
        <div className="join-sub">
          Write your name on the chit and enter
        </div>

        <div className="join-chit"></div>

        <input
          className="join-input"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="join-btn" onClick={joinGame}>
          🚪 Enter Game
        </button>

        {error && (
          <p className="message-error" style={{ marginTop: "15px" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default JoinGame;
