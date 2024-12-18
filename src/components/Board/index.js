import React from "react";
import "./Board.css";

const Board = ({ board, shots, onCellClick, isEnemy }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => {
            let cellClass = "cell";

            // Highlight based on shot status (hit or miss)
            if (shots[rowIndex][colIndex] === "hit") {
              cellClass += " hit";
            } else if (shots[rowIndex][colIndex] === "miss") {
              cellClass += " miss";
            }
            if (!isEnemy && cell) {
              cellClass += " ship";
            }

            return (
              <div
                key={colIndex}
                className={cellClass}
                onClick={() => onCellClick(rowIndex, colIndex)}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
