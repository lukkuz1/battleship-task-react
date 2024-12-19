import { ships } from "../components/Ships/Ships";

export const initializeBoard = () => {
  return Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
};

const canPlaceShip = (board, row, col, size, orientation) => {
  if (orientation === "horizontal") {
    if (col + size > 10) return false;
    for (let i = 0; i < size; i++) {
      if (board[row][col + i] !== null) return false;
      for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col + i - 1; c <= col + i + 1; c++) {
          if (r >= 0 && r < 10 && c >= 0 && c < 10 && board[r][c] !== null) {
            return false;
          }
        }
      }
    }
  } else {
    if (row + size > 10) return false;
    for (let i = 0; i < size; i++) {
      if (board[row + i][col] !== null) return false;
      for (let r = row + i - 1; r <= row + i + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
          if (r >= 0 && r < 10 && c >= 0 && c < 10 && board[r][c] !== null) {
            return false;
          }
        }
      }
    }
  }
  return true;
};

export const placeShip = (board, row, col, size, orientation) => {
  if (canPlaceShip(board, row, col, size, orientation)) {
    if (orientation === "horizontal") {
      for (let i = 0; i < size; i++) {
        board[row][col + i] = true;
      }
    } else {
      for (let i = 0; i < size; i++) {
        board[row + i][col] = true;
      }
    }
    return true;
  }
  return false;
};

export const placeShipRandomly = (board, ship) => {
  let placed = false;
  while (!placed) {
    const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    placed = placeShip(board, row, col, ship.size, orientation);
  }
};

export const placeAllShips = (board) => {
  ships.forEach((ship) => {
    placeShipRandomly(board, ship);
  });
};
