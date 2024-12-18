import React from "react";

const Cell = ({ row, col, shotStatus, isShip, onClick }) => {
  const cellContent =
    shotStatus === "hit" ? "X" : shotStatus === "miss" ? "O" : "";
  return (
    <div
      className={`cell ${isShip ? "ship" : ""} ${shotStatus ? shotStatus : ""}`}
      onClick={onClick}
    >
      {cellContent}
    </div>
  );
};

export default Cell;
