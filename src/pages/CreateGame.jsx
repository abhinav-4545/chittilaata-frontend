import { useState } from "react";
import { apiRequest } from "../services/api";
import "../utils/ui.css";

function CreateGame() {
  const [rounds, setRounds] = useState(3);
  const [gameLink, setGameLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  async function createGame() {
    try {
      setError("");
      setCopied(false);

      const data = await apiRequest(
        `/game/create?totalRounds=${rounds}`,
        { method: "POST" }
      );

      // ✅ dynamic origin (localhost / netlify / prod)
      const link = `${window.location.origin}/join/${data.gameId}`;
      setGameLink(link);
    } catch (err) {
      setError(err.message);
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(gameLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="create-wrapper">
      <div className="create-card">
        <div className="create-title">🧾 CHITTILAATA</div>

        <div className="create-sub">
          Create a game • Share the link • Let the chits decide
        </div>

        {/* Round selection */}
        <div style={{ marginBottom: "20px" }}>
          <p style={{ marginBottom: "8px" }}>Select number of rounds</p>
          <select
            value={rounds}
            onChange={(e) => setRounds(e.target.value)}
            style={{
              padding: "12px",
              fontSize: "18px",
              borderRadius: "10px",
            }}
          >
            <option value={3}>3 Rounds</option>
            <option value={5}>5 Rounds</option>
            <option value={7}>7 Rounds</option>
            <option value={10}>10 Rounds</option>
          </select>
        </div>

        {/* Create button */}
        <button className="create-btn" onClick={createGame}>
          🎉 Create Game
        </button>

        {/* Share link */}
        {gameLink && (
          <div className="game-link">
            <p>🔗 Share this link with friends</p>
            <p style={{ fontSize: "14px" }}>{gameLink}</p>

            <button className="button" onClick={copyLink}>
              📋 Copy Link
            </button>

            {copied && (
              <p className="message-success">✔ Link copied!</p>
            )}
          </div>
        )}

        {error && <p className="message-error">{error}</p>}
      </div>
    </div>
  );
}

export default CreateGame;
