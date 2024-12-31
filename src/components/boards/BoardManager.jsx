import React, { useState } from "react";
import { useBoard } from "../../contexts/BoardContext";
import BoardEdit from "./BoardEdit";
import AddBoard from './AddBoard';

export default function BoardManager() {
  const { boards, updateBoardName, deleteBoard } = useBoard();
  const [editBoardId, setEditBoardId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ type: '', message: '' });

  const handleEdit = (boardId) => {
    setEditBoardId(boardId);
  };

  const handleSave = async (boardId, newName) => {
    setLoading(true);
    setNotification({ type: '', message: '' });
    try {
      await updateBoardName(boardId, newName);
      setNotification({ type: 'success', message: 'Board name updated successfully!' });
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to update board name.' });
    } finally {
      setLoading(false);
      setEditBoardId(null);
    }
  };

  const handleDelete = async (boardId) => {
    setLoading(true);
    setNotification({ type: '', message: '' });
    try {
      await deleteBoard(boardId);
      setNotification({ type: 'success', message: 'Board deleted successfully!' });
      setTimeout(() => {
        setNotification({ type: '', message: '' });
      }, 5000);
    } catch (error) {
      setNotification({ type: 'error', message: error.message || 'Failed to delete board.' });
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
      {notification.message && (
        <p className={`text-center text-${notification.type}`}>{notification.message}</p>
      )}
      <AddBoard />

      <div className="row g-3">
        {boards.length === 0 && <p>No boards available</p>}
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
                      width="25"
                      height="25"
                      viewBox="0 0 48 48"
                    >
                      <path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 10.238281 10 A 1.50015 1.50015 0 0 0 9.9804688 9.9785156 A 1.50015 1.50015 0 0 0 9.7578125 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6386719 13 L 11.15625 39.029297 C 11.427329 41.835926 13.811782 44 16.630859 44 L 31.367188 44 C 34.186411 44 36.570826 41.836168 36.841797 39.029297 L 39.361328 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 38.244141 10 A 1.50015 1.50015 0 0 0 37.763672 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 11.650391 13 L 36.347656 13 L 33.855469 38.740234 C 33.730439 40.035363 32.667963 41 31.367188 41 L 16.630859 41 C 15.331937 41 14.267499 40.033606 14.142578 38.740234 L 11.650391 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"></path>
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
