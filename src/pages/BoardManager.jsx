import React, { useState } from "react";
import { useBoard } from "../contexts/BoardContext";
import BoardEdit from "./BoardEdit";
import AddBoard from "./AddBoard";
import BoardList from "../components/boards/BoardList";

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
      }, 3000);
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
      
      <BoardList boards={boards} onDelete={handleDelete} onSelect={handleEdit} />
      
      {editBoardId && (
        <BoardEdit
          board={boards.find((board) => board.id === editBoardId)}
          onSave={handleSave}
          onCancel={handleCancel}
          loading={loading}
        />
      )}
    </div>
  );
}
