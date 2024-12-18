import React from "react";
import Board from "./components/Board/index.js";
import { useGameLogic } from "./hooks/gameLogic.js";

const App = () => {
  const {
    playerBoard,
    enemyBoard,
    playerShots,
    enemyShots,
    gameStatus,
    remainingShots,
    handlePlayerShot,
    resetGame,
  } = useGameLogic();

  return (
    <div className="game">
      <h1>Battleship Game</h1>

      {/* Show game status */}
      <div className="status">{gameStatus}</div>

      {/* Show remaining shots */}
      <div className="status">Remaining Shots: {remainingShots}</div>

      {/* Notification for out of shots */}
      {remainingShots <= 0 && gameStatus === "Game In Progress" && (
        <div className="notification">
          <p>You've run out of shots!</p>
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

      {gameStatus !== "Game In Progress" && (
        <button onClick={resetGame}>Restart Game</button>
      )}
    </div>
  );
};

export default App;
