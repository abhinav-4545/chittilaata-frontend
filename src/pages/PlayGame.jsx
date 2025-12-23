import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../services/api";
import "../utils/ui.css";

function PlayGame() {
  const { gameId } = useParams();
  const myPlayerId = Number(localStorage.getItem("playerId"));

  const [game, setGame] = useState(null);
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const [announcement, setAnnouncement] = useState("");

  async function fetchGame() {
    const data = await apiRequest(`/game/${gameId}`);

    /* 🏁 GAME END */
    if (data.currentPhase === "GAME_END") {
      window.location.href = `/final/${gameId}`;
      return;
    }

    /* 🟡 FIRST LOAD */
    if (!game) {
      const g = data.players.find(
        (p) => p.role.curRole === data.currentTurnRole
      );

      if (g) {
        setAnnouncement(`🎯 ${g.name} (${g.role.curRole}) is guessing`);
      }

      setGame(data);
      return;
    }

    /* 🟢 ROUND CHANGE */
    if (data.currentRound !== game.currentRound) {
      window.location.href = `/round/${gameId}`;
      return;
    }

    /* 🔔 NORMAL UPDATE */
    updateAnnouncement(game, data);
    setGame(data);
  }

  function updateAnnouncement(oldG, newG) {
    /* Turn change */
    if (oldG.currentTurnRole !== newG.currentTurnRole) {
      const g = newG.players.find(
        (p) => p.role.curRole === newG.currentTurnRole
      );

      if (g) {
        setAnnouncement(`👑 ${g.name} (${g.role.curRole}) is guessing`);
      }
      return;
    }

    /* Reveal */
    for (let p of newG.players) {
      const oldP = oldG.players.find((x) => x.id === p.id);
      if (!oldP.revealed && p.revealed) {
        setAnnouncement(`🧾 ${p.name} revealed as ${p.role.curRole}`);
        return;
      }
    }
  }

  function me() {
    return game.players.find((p) => p.id === myPlayerId);
  }

  function guesser() {
    return game.players.find(
      (p) => p.role.curRole === game.currentTurnRole
    );
  }

  async function makeGuess() {
    const g = guesser();
    if (g.id !== myPlayerId || !selectedPlayerId) return;

    await apiRequest(
      `/game/${gameId}/guess?guesserId=${g.id}&guessedId=${selectedPlayerId}`,
      { method: "POST" }
    );

    setSelectedPlayerId(null);
    fetchGame();
  }

  useEffect(() => {
    fetchGame();
    const i = setInterval(fetchGame, 1000);
    return () => clearInterval(i);
  }, []);

  if (!game) return null;

  const g = guesser();
  const isMyTurn = g.id === myPlayerId;

  return (
    <div className="container">
      <div className="title">🎮 ChittiLaata</div>

      {/* STATUS PANEL */}
      <div className="card" style={{ textAlign: "center" }}>
        <p>👤 You: <b>{me().name}</b></p>
        <p>🎭 Your Role: <b>{me().role.curRole}</b></p>
        <p>🔁 Round: {game.currentRound}/{game.totalRounds}</p>
        <p>
          🎯 Current Turn: <b>{g.name}</b> ({g.role.curRole})
        </p>
      </div>

      {/* ANNOUNCEMENT */}
      <div
        className="card"
        style={{
          textAlign: "center",
          fontSize: "22px",
          fontWeight: "700",
        }}
      >
        {announcement || "⏳ Waiting for move…"}
      </div>

      {/* CHITS */}
      <div className="paper-grid">
        {game.players.map((p) => {
          let cls = "paper";
          if (p.id === g.id) cls += " paper-king";
          if (p.id === selectedPlayerId) cls += " paper-selected";
          if (!isMyTurn || p.id === g.id || p.revealed)
            cls += " paper-disabled";

          return (
            <div
              key={p.id}
              className={cls}
              onClick={() =>
                isMyTurn &&
                p.id !== g.id &&
                !p.revealed &&
                setSelectedPlayerId(p.id)
              }
            >
              {p.name}
            </div>
          );
        })}
      </div>

      <button
        className="button"
        disabled={!isMyTurn}
        onClick={makeGuess}
      >
        🎭 Unfold Chit
      </button>

      <button
        className="button"
        onClick={() =>
          (window.location.href = `/standings/${gameId}`)
        }
      >
        📊 Current Standings
      </button>
    </div>
  );
}

export default PlayGame;
