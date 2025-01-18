import React from "react";
import BoardCard from "./BoardCard";

const BoardList = ({ boards, onDelete, onSelect }) => {
  return (
    <div className="board-list mt-4">
      {boards.length > 0 ? (
        boards.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
            onDelete={onDelete}
            onSelect={onSelect}
          />
        ))
      ) : (
        <p>No boards available. Create one to get started.</p>
      )}
    </div>
  );
};

export default BoardList;
