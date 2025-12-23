import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import "../utils/ui.css";

function FinalPage() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [players, setPlayers] = useState([]);
  const [totalRounds, setTotalRounds] = useState(0);

  useEffect(() => {
    async function load() {
      const game = await apiRequest(`/game/${gameId}`);
      setPlayers(game.players);
      setTotalRounds(game.totalRounds);
    }
    load();
  }, []);

  if (players.length === 0) return null;

  const sorted = [...players].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  return (
    <div className="container">
      {/* 🎉 CONFETTI */}
      <div className="confetti">
        {Array.from({ length: 40 }).map((_, i) => (
          <span
            key={i}
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              background: ["gold", "hotpink", "cyan", "lime"][i % 4],
            }}
          />
        ))}
      </div>

      <div className="title">🏆 Final Results</div>

      {/* 👑 WINNER CARD */}
      <div
        className="card"
        style={{
          textAlign: "center",
          border: "4px solid gold",
          animation: "pulse 1.5s infinite",
        }}
      >
        <h1>👑 Winner</h1>
        <h2>{winner.name}</h2>

        <p style={{ fontSize: "22px", fontWeight: "700" }}>
          {winner.score} points
        </p>

        <p>
          Role: <b>{winner.role.curRole}</b>
        </p>
      </div>

      {/* 🔁 ROUNDS INFO */}
      <div className="card" style={{ textAlign: "center" }}>
        <p>
          Total Rounds Played: <b>{totalRounds}</b>
        </p>
      </div>

      {/* 📊 LEADERBOARD */}
      <div className="card">
        <h2 style={{ textAlign: "center" }}>📊 Leaderboard</h2>

        {sorted.map((p, index) => (
          <div
            key={p.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <span>
              #{index + 1} {p.name}
            </span>
            <span>
              {p.score} pts ({p.role.curRole})
            </span>
          </div>
        ))}
      </div>

      {/* 🔁 ACTION */}
      <button className="button" onClick={() => navigate("/")}>
        🔁 New Game
      </button>
    </div>
  );
}

export default FinalPage;
