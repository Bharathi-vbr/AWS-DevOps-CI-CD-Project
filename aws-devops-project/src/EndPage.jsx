import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

export default function EndPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, win = false } = location.state || {};

  const handleRestart = () => {
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <div className="game-outer">
      <div className="game-container">
        <h1 className="main-title">2048 Game</h1>
        {win ? (
          <div className="game-message win">
            <div>
              <strong>You Win!</strong> <br />Congratulations!
            </div>
            <div className="score">Final Score: <span>{score}</span></div>
          </div>
        ) : (
          <div className="game-message lose">
            <div>
              <strong>Try Again!</strong><br />Game Over.<br />Final Score: {score}
            </div>
          </div>
        )}
        <button className="restart-btn" style={{marginTop:20}} onClick={handleRestart}>
          Restart Game
        </button>
      </div>
    </div>
  );
}
