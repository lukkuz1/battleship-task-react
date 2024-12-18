import { useState, useEffect } from "react";
import { ships } from "../components/Ships/Ships";

// Initialize an empty 10x10 board
export const initializeBoard = () => {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  return board;
};

// Place a ship on the board, either horizontally or vertically
export const placeShip = (board, row, col, size, orientation) => {
  if (orientation === "horizontal") {
    if (col + size > 10) return false; // Ship goes out of bounds
    for (let i = 0; i < size; i++) {
      if (board[row][col + i] !== null) return false; // Space is already occupied
    }
    for (let i = 0; i < size; i++) {
      board[row][col + i] = true; // Mark ship positions on the board
    }
  } else {
    if (row + size > 10) return false; // Ship goes out of bounds
    for (let i = 0; i < size; i++) {
      if (board[row + i][col] !== null) return false; // Space is already occupied
    }
    for (let i = 0; i < size; i++) {
      board[row + i][col] = true; // Mark ship positions on the board
    }
  }
  return true;
};

// Place a ship randomly on the board
export const placeShipRandomly = (board, ship) => {
  let placed = false;
  while (!placed) {
    const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    placed = placeShip(board, row, col, ship.size, orientation);
  }
};

// Check the game status based on remaining ships and shots
export const checkGameStatus = (playerBoard, enemyBoard, remainingShots) => {
  const allSunk = !enemyBoard.some((row) => row.some((cell) => cell === true)); // Check if all enemy ships are sunk
  const playerLost = remainingShots === 0 && !allSunk; // Player loses if no shots are left and all ships are not sunk
  if (allSunk) return "You Win!"; // If all enemy ships are sunk, player wins
  if (playerLost) return "You Lose!"; // If player has no shots left and still not won, they lose

  return "Game In Progress"; // If the game is still ongoing
};

// Custom hook for managing game logic
export const useGameLogic = () => {
  const initialShots = 25; // The player starts with 25 shots
  const [playerBoard, setPlayerBoard] = useState(initializeBoard());
  const [enemyBoard, setEnemyBoard] = useState(initializeBoard());
  const [playerShots, setPlayerShots] = useState(initializeBoard());
  const [enemyShots, setEnemyShots] = useState(initializeBoard());
  const [gameStatus, setGameStatus] = useState("Game Started");
  const [remainingShots, setRemainingShots] = useState(initialShots);

  useEffect(() => {
    let tempPlayerBoard = initializeBoard();
    let tempEnemyBoard = initializeBoard();

    ships.forEach((ship) => {
      placeShipRandomly(tempPlayerBoard, ship);
      placeShipRandomly(tempEnemyBoard, ship);
    });

    setPlayerBoard(tempPlayerBoard);
    setEnemyBoard(tempEnemyBoard);
  }, []);

  const handlePlayerShot = (row, col) => {
    if (enemyShots[row][col] !== null || remainingShots <= 0) return; // Ignore already shot cells and if no shots left

    let newEnemyShots = [...enemyShots];
    const shotResult = enemyBoard[row][col] ? "hit" : "miss"; // Determine if it's a hit or miss

    newEnemyShots[row][col] = shotResult; // Mark shot result (hit or miss)
    setEnemyShots(newEnemyShots);

    // Only decrement remaining shots if it's a miss
    if (shotResult === "miss") {
      setRemainingShots((prevShots) => prevShots - 1); // Use the previous state value to decrement remaining shots
    }

    setGameStatus((prevStatus) =>
      checkGameStatus(playerBoard, enemyBoard, remainingShots)
    ); // Update game status

    handleAIShoot(); // Handle AI shot after player shoots
  };

  const handleAIShoot = () => {
    // AI should not have remaining shots and it should not affect player shots
    let aiShot = false;
    while (!aiShot) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      if (playerShots[row][col] === null) {
        let newPlayerShots = [...playerShots];
        newPlayerShots[row][col] = playerBoard[row][col] ? "hit" : "miss"; // Mark AI shot
        setPlayerShots(newPlayerShots);
        aiShot = true;
      }
    }
  };

  const resetGame = () => {
    let tempPlayerBoard = initializeBoard();
    let tempEnemyBoard = initializeBoard();
    ships.forEach((ship) => {
      placeShipRandomly(tempPlayerBoard, ship);
      placeShipRandomly(tempEnemyBoard, ship);
    });
    setPlayerBoard(tempPlayerBoard);
    setEnemyBoard(tempEnemyBoard);
    setPlayerShots(initializeBoard());
    setEnemyShots(initializeBoard());
    setRemainingShots(initialShots);
    setGameStatus("Game Started");
  };

  return {
    playerBoard,
    enemyBoard,
    playerShots,
    enemyShots,
    gameStatus,
    remainingShots,
    handlePlayerShot,
    handleAIShoot,
    resetGame,
  };
};
