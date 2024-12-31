import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BoardProvider } from './contexts/BoardContext';
import { NoteProvider } from './contexts/NoteContext';

import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Dashboard from './components/dashboard/Dashboard';
import AddBoard from './components/Boards/AddBoard';
import BoardManager from './components/Boards/BoardManager';
import AddNote from './components/Notes/AddNote';
import EditNote from './components/Notes/EditNote';
import NoteManager from './components/Notes/NoteManager';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BoardProvider>
          <NoteProvider>
            <Navbar />
            <div className="main-content">
              <Routes>
                {/* Public Routes */}
                {/* <Route path="/" element={<Login />} /> */}
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/boards"
                  element={
                    <ProtectedRoute>
                      <BoardManager />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/boards/add"
                  element={
                    <ProtectedRoute>
                      <AddBoard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notes"
                  element={
                    <ProtectedRoute>
                      <NoteManager />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notes/add"
                  element={
                    <ProtectedRoute>
                      <AddNote />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/notes/edit/:id"
                  element={
                    <ProtectedRoute>
                      <EditNote />
                    </ProtectedRoute>
                  }
                />

                {/* Catch-All Route */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <Footer />
          </NoteProvider>
        </BoardProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
