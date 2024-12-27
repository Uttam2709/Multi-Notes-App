import React from 'react';
import AddBoard from './AddBoard';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../assets/CustomStyle.css';
import BoardManager from './BoardManager';


export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="dashboard">
       <div className="dashboard-header">
        <h1>Welcome to Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <AddBoard />
      <BoardManager />
    </div>
  );
}
