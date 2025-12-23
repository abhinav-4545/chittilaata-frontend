import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import "../utils/ui.css";

function RoundStart() {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [round, setRound] = useState(0);
  const [totalRounds, setTotalRounds] = useState(0);
  const [guesser, setGuesser] = useState(null);

  useEffect(() => {
    async function load() {
      const game = await apiRequest(`/game/${gameId}`);

      setRound(game.currentRound);
      setTotalRounds(game.totalRounds);

      const g = game.players.find(
        (p) => p.role.curRole === game.currentTurnRole
      );
      setGuesser(g);

      // ⏳ short pause before play
      setTimeout(() => {
        navigate(`/play/${gameId}`);
      }, 2500);
    }

    load();
  }, []);

  if (!guesser) return null;

  return (
    <div className="container" style={{ textAlign: "center" }}>
      <div className="title">🎯 Round {round}</div>

      <div className="card">
        <p style={{ fontSize: "22px" }}>
          Round {round} of {totalRounds}
        </p>

        <p style={{ fontSize: "26px", marginTop: "20px" }}>
          👑 <b>{guesser.name}</b>
        </p>

        <p style={{ fontSize: "20px" }}>
          Role: <b>{guesser.role.curRole}</b>
        </p>

        <p style={{ marginTop: "20px", opacity: 0.8 }}>
          Get ready…
        </p>
      </div>
    </div>
  );
}

export default RoundStart;
