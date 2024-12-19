export const checkGameStatus = (
  playerBoard,
  enemyBoard,
  remainingShots,
  aiShots
) => {
  const allPlayerShipsSunk = !playerBoard.some((row) =>
    row.some((cell) => cell === true)
  );
  const allEnemyShipsSunk = !enemyBoard.some((row) =>
    row.some((cell) => cell === true)
  );
  // Player has no shots left and/or all ships sunk
  if (remainingShots === 0 ) return "You Lose! You have run out of shots!";
  if(allPlayerShipsSunk) return "You Lose! All your ships have been destroyed!";
  // AI has no shots left
  if (aiShots === 0 && !allPlayerShipsSunk) return "You Win! AI has run out of shots!";
  // If all enemy ships are sunk, player wins
  if (allEnemyShipsSunk) return "You Win! All AI ships are destroyed!";
  // If the game is still in progress
  return "Game In Progress";
};
