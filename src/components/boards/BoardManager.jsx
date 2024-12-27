import React, { useState } from "react";
import { useBoard } from "../../contexts/BoardContext";
import BoardEdit from "./BoardEdit";
import AddBoard from "./AddBoard";

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
      setTimeout(() => {
        setSuccess("");
      }, 5000);
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
      {loading && <p className="text-center text-info">Loading...</p>}
      {error && <p className="text-center text-danger">{error}</p>}
      {success && <p className="text-center text-success">{success}</p>}
      <AddBoard />

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
              <div className="card p-3 shadow-sm rounded board-card">
                <h5 className="card-title text-center">{board.name}</h5>
                <div className="d-flex justify-content-end align-items-center mt-3 gap-2">
                  <button
                    className="btn btn-light edit-btn"
                    onClick={() => handleEdit(board.id)}
                    disabled={loading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 26 26"
                    >
                      <path d="M 20.09375 0.25 C 19.5 0.246094 18.917969 0.457031 18.46875 0.90625 L 17.46875 1.9375 L 24.0625 8.5625 L 25.0625 7.53125 C 25.964844 6.628906 25.972656 5.164063 25.0625 4.25 L 21.75 0.9375 C 21.292969 0.480469 20.6875 0.253906 20.09375 0.25 Z M 16.34375 2.84375 L 14.78125 4.34375 L 21.65625 11.21875 L 23.25 9.75 Z M 13.78125 5.4375 L 2.96875 16.15625 C 2.71875 16.285156 2.539063 16.511719 2.46875 16.78125 L 0.15625 24.625 C 0.0507813 24.96875 0.144531 25.347656 0.398438 25.601563 C 0.652344 25.855469 1.03125 25.949219 1.375 25.84375 L 9.21875 23.53125 C 9.582031 23.476563 9.882813 23.222656 10 22.875 L 20.65625 12.3125 L 19.1875 10.84375 L 8.25 21.8125 L 3.84375 23.09375 L 2.90625 22.15625 L 4.25 17.5625 L 15.09375 6.75 Z M 16.15625 7.84375 L 5.1875 18.84375 L 6.78125 19.1875 L 7 20.65625 L 18 9.6875 Z"></path>
                    </svg>
                  </button>
                  <button
                    className="btn btn-light delete-btn"
                    onClick={() => handleDelete(board.id)}
                    disabled={loading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                    >
                      <path d="M 24 4 C ..."></path>
                    </svg>
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
