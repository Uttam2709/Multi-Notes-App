import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Added Navigate
import { AuthProvider } from "./contexts/AuthContext";
import { BoardProvider } from "./contexts/BoardContext";
import { NoteProvider } from "./contexts/NoteContext";

import ProtectedRoute from "./components/auth/ProtectedRoute";

// Auth Files
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

import Dashboard from "./components/dashboard/Dashboard";

// Boards Files
import BoardManager from "./components/boards/BoardManager";
import AddBoard from "./components/boards/AddBoard";

// Notes Files
import NoteManager from "./components/Notes/NoteManager";
import AddNote from "./components/Notes/AddNote";
import EditNote from "./components/Notes/EditNote";

import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BoardProvider>
          <NoteProvider>
            <div className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

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

                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
            {/* <Footer /> */}
          </NoteProvider>
        </BoardProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
