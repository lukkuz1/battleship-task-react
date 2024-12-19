import { useState, useEffect } from "react";
import { initializeBoard, placeShipRandomly } from "../utils/boardUtils";
import { checkGameStatus } from "../utils/gameUtils";
import { ships } from "../components/Ships/Ships";

export const useGameLogic = () => {
  const initialShots = 25;
  const [playerBoard, setPlayerBoard] = useState(initializeBoard());
  const [enemyBoard, setEnemyBoard] = useState(initializeBoard());
  const [playerShots, setPlayerShots] = useState(initializeBoard());
  const [enemyShots, setEnemyShots] = useState(initializeBoard());
  const [gameStatus, setGameStatus] = useState("Game Started");
  const [remainingShots, setRemainingShots] = useState(initialShots);
  const [aiShots, setAIShots] = useState(initialShots);

  useEffect(() => {
    resetGame();
  }, []);

  const handlePlayerShot = (row, col) => {
    if (
      enemyShots[row][col] !== null ||
      remainingShots <= 0 ||
      gameStatus !== "Game In Progress"
    )
      return;
    let newEnemyShots = [...enemyShots];
    const shotResult = enemyBoard[row][col] ? "hit" : "miss";
    newEnemyShots[row][col] = shotResult;
    setEnemyShots(newEnemyShots);
    if (shotResult === "miss") {
      setRemainingShots((prevShots) => prevShots - 1);
    }
    setGameStatus(
      checkGameStatus(playerBoard, enemyBoard, remainingShots - 1, aiShots)
    );
    handleAIShoot();
  };

  const handleAIShoot = () => {
    if (gameStatus !== "Game In Progress") return;
    let aiShot = false;
    while (!aiShot) {
      const row = Math.floor(Math.random() * 10);
      const col = Math.floor(Math.random() * 10);
      if (playerShots[row][col] === null) {
        let newPlayerShots = [...playerShots];
        const shotResult = playerBoard[row][col] ? "hit" : "miss";

        newPlayerShots[row][col] = shotResult;
        setPlayerShots(newPlayerShots);

        if (shotResult === "miss") {
          setAIShots((prevShots) => prevShots - 1);
        }

        aiShot = true;
      }
    }

    setGameStatus(
      checkGameStatus(playerBoard, enemyBoard, remainingShots, aiShots - 1)
    );
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
    setAIShots(initialShots);
    setGameStatus("Game In Progress");
  };

  useEffect(() => {
    if (gameStatus === "You Win!" || gameStatus === "You Lose!") {
      const timer = setTimeout(resetGame, 10000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus]);

  return {
    playerBoard,
    enemyBoard,
    playerShots,
    enemyShots,
    gameStatus,
    remainingShots,
    aiShots,
    handlePlayerShot,
    handleAIShoot,
    resetGame,
  };
};
