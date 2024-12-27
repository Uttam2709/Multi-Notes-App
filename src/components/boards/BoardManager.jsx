import React, { useState } from "react";
import { useBoard } from "../../contexts/BoardContext";
import BoardEdit from "./BoardEdit";

export default function BoardManager() {
  const { boards, updateBoardName, deleteBoard } = useBoard();
  const [editBoardId, setEditBoardId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEdit = (boardId) => {
    setEditBoardId(boardId);
  };

  const handleSave = async (boardId, newName) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await updateBoardName(boardId, newName);
      setSuccess("Board name updated successfully!");
    } catch (error) {
      setError("Failed to update board name.");
    } finally {
      setLoading(false);
      setEditBoardId(null);
    }
  };

  const handleDelete = async (boardId) => {
    setLoading(true);
    setError("");
    try {
      await deleteBoard(boardId);
      setSuccess("Board deleted successfully!");
    } catch (error) {
      setError("Failed to delete board.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditBoardId(null);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Boards</h2>

      {loading && <p className="text-center text-info">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {success && <p className="text-center text-success">{success}</p>}

      <div className="row g-3">
        {boards.map((board) => (
          <div key={board.id} className="col-md-4">
            {editBoardId === board.id ? (
              <BoardEdit
                board={board}
                onSave={handleSave}
                onCancel={handleCancel}
                loading={loading}
              />
            ) : (
              <div className="card p-3 shadow-sm">
                <h5 className="card-title text-center">{board.name}</h5>
                <div className="d-flex justify-content-between mt-3">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEdit(board.id)}
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(board.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
