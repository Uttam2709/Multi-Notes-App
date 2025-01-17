import React, { useState } from "react";

export default function BoardEdit({ board, onSave, onCancel, loading }) {
  const [newBoardName, setNewBoardName] = useState(board.name);

  const handleSave = () => {
    onSave(board.id, newBoardName);
  };

  return (
    <div className="d-flex align-items-center">
      <input
        type="text"
        value={newBoardName}
        onChange={(e) => setNewBoardName(e.target.value)}
        className="form-control"
      />
      <button
        className="btn btn-success ms-2"
        onClick={handleSave}
        disabled={loading}
      >
        Save
      </button>
      <button className="btn btn-secondary ms-2" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
}
