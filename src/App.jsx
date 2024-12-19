import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BoardProvider } from './contexts/BoardContext';
import { NoteProvider } from './contexts/NoteContext';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Dashboard from './components/boards/Dashboard';

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BoardProvider>
          <NoteProvider>
              <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </NoteProvider>
        </BoardProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
