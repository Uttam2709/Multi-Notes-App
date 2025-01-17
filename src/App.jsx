import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import Context Providers
import { AuthProvider } from "./contexts/AuthContext";
import { BoardProvider } from "./contexts/BoardContext";
import { NoteProvider } from "./contexts/NoteContext";

// Import Components and Routes
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Auth Pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import Dashboard from "./pages/Dashboard";

// Board Pages
import BoardManager from "./pages/BoardManager";
import AddBoard from "./pages/AddBoard";
import BoardEdit from "./pages/BoardEdit";

// Note Pages
import NoteManager from "./pages/NoteManager";
import AddNote from "./pages/AddNote";
import NoteEdit from "./pages/NoteEdit";
import NotFound from "./pages/NotFound";

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
                  path="/boards/edit/:id"
                  element={
                    <ProtectedRoute>
                      <BoardEdit />
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
                      <NoteEdit />
                    </ProtectedRoute>
                  }
                />

                {/* Redirect unknown paths to login */}
                <Route path="*" element={< NotFound />} />
              </Routes>
            </div>
          </NoteProvider>
        </BoardProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
