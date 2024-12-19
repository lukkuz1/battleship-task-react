import React, { useState } from "react";
import Board from "./components/Board/index.js";
import { useGameLogic } from "./hooks/gameLogic.js";
import "./styles.css";

const App = () => {
  const {
    playerBoard,
    enemyBoard,
    playerShots,
    enemyShots,
    gameStatus,
    remainingShots,
    aiShots,
    handlePlayerShot,
    resetGame,
  } = useGameLogic();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const showRestartButton =
    gameStatus !== "Game In Progress" || remainingShots <= 0 || aiShots <= 0;
  const showShotsInfo = gameStatus === "Game In Progress";

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>Battleship Game</h1>
        <button className="instructions-button" onClick={toggleModal}>
          How to Play
        </button>
      </header>

      {/* Modal for Game Instructions */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>How to Play</h2>
            <p>
              The game is played on a 10x10 grid. Player takes turns with computer
              shooting at the each others grid. The goal is to sink all of the
              opponent's ships before they sink yours!
            </p>
            <ul>
              <li>Click on a cell to shoot at it.</li>
              <li>Red indicates a hit, and blue indicates a miss.</li>
              <li>If you hit all the cells of a ship, it’s destroyed.</li>
              <li>You only have 25 shots. If you miss a shot it decreases. A player can lose if he misses 25 shots!</li>
            </ul>
            <button className="close-modal-button" onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="status-container">
        <div className="status">
          {/* Display the current game status */}
          <p>{gameStatus}</p>
        </div>

        {/* Show shot info only if the game is in progress */}
        {showShotsInfo && (
          <div className="shots-info">
            <p>Player Remaining Shots: {remainingShots}</p>
            <p>AI Remaining Shots: {aiShots}</p>
          </div>
        )}

        {/* Notifications */}
        {remainingShots <= 0 && gameStatus === "Game In Progress" && (
          <div className="notification">
            <p>You've run out of shots! You Lose!</p>
          </div>
        )}

        {aiShots <= 0 && gameStatus === "Game In Progress" && (
          <div className="notification">
            <p>The AI has run out of shots! You Win!</p>
          </div>
        )}
      </div>

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

      {/* Restart button */}
      {showRestartButton && (
        <button className="reset-button" onClick={resetGame}>
          Restart Game
        </button>
      )}
    </div>
  );
};

export default App;