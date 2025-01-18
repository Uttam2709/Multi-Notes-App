import React from "react";

const BoardCard = ({ board, onSelect, onDelete }) => {
  return (
    <div className="board-card card p-3 shadow-sm rounded">
      <h5 className="card-title text-center">{board.name}</h5>
      <p>{board.description}</p>
      <div className="d-flex justify-content-end align-items-center mt-3 gap-2">
        <button className="btn btn-light" onClick={() => onSelect(board.id)}>
          View
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(board.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BoardCard;
