import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import "../utils/ui.css";

function Standings() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const myPlayerId = Number(localStorage.getItem("playerId"));

  const [players, setPlayers] = useState([]);
  const [phase, setPhase] = useState("");

  useEffect(() => {
    async function load() {
      const data = await apiRequest(`/game/${gameId}`);
      setPlayers(data.players);
      setPhase(data.currentPhase);
    }
    load();
  }, []);

  return (
    <div className="container">
      <div className="title">📊 Current Standings</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {[...players]
          .sort((a, b) => b.score - a.score)
          .map((p, index) => {
            const isMe = p.id === myPlayerId;

            return (
              <div
                key={p.id}
                className="card"
                style={{
                  textAlign: "center",
                  border: isMe ? "3px solid gold" : "none",
                }}
              >
                <h2>
                  #{index + 1} {p.name}
                </h2>

                <p style={{ fontSize: "20px", fontWeight: "700" }}>
                  {p.score} pts
                </p>

                {/* Show role only at end */}
                {phase === "GAME_END" && (
                  <p>Role: {p.role.curRole}</p>
                )}

                {isMe && <p>👑 You</p>}
              </div>
            );
          })}
      </div>

      <button
        className="button"
        style={{ marginTop: "30px" }}
        onClick={() => navigate(-1)}
      >
        ⬅ Back
      </button>
    </div>
  );
}

export default Standings;
