import React from "react";

const BoardCard = ({ board, onSelect, onDelete }) => {
  return (
    <div className="board-card">
      <h3>{board.name}</h3>
      <p>{board.description}</p>
      <button onClick={() => onSelect(board.id)}>View</button>
      <button onClick={() => onDelete(board.id)}>Delete</button>
    </div>
  );
};

export default BoardCard;
