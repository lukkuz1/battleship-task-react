import React from "react";
import Board from "./components/Board/index.js";
import { useGameLogic } from "./hooks/gameLogic.js";
import "./styles.css"; // Import the updated CSS

const App = () => {
  const {
    playerBoard,
    enemyBoard,
    playerShots,
    enemyShots,
    gameStatus,
    remainingShots,
    aiShots, // Add aiShots to destructure
    handlePlayerShot,
    resetGame,
  } = useGameLogic();

  return (
    <div className="game">
      <h1>Battleship Game</h1>

      {/* Show game status */}
      <div className="status">{gameStatus}</div>

      {/* Show remaining shots for both player and AI */}
      <div className="status">
        <p>Player Remaining Shots: {remainingShots}</p>
        <p>AI Remaining Shots: {aiShots}</p>
      </div>

      {/* Notifications for out of shots */}
      {remainingShots <= 0 && gameStatus === "Game In Progress" && (
        <div className="notification">
          <p>You've run out of shots!</p>
        </div>
      )}

      {aiShots <= 0 && gameStatus === "Game In Progress" && (
        <div className="notification">
          <p>The AI has run out of shots!</p>
        </div>
      )}

      <div className="boards">
        <div className="board-container">
          <h2>Your Board</h2>
          <Board
            board={playerBoard}
            shots={playerShots}
            onCellClick={() => {}}
            isEnemy={false}
          />
        </div>
        <div className="board-container">
          <h2>Enemy's Board</h2>
          <Board
            board={enemyBoard}
            shots={enemyShots}
            onCellClick={handlePlayerShot}
            isEnemy={true}
          />
        </div>
      </div>

      {/* Restart game button */}
      {gameStatus !== "Game In Progress" && (
        <button onClick={resetGame}>Restart Game</button>
      )}
    </div>
  );
};

export default App;