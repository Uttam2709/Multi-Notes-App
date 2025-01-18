import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const NoteContext = createContext();

export function useNote() {
  return useContext(NoteContext);
}

export function NoteProvider({ children }) {
  const { currentUser } = useAuth();
  const [notes, setNotes] = useState([]);

  const fetchNotes = (boardId) => {
    if (!currentUser || !boardId) return;

    const notesRef = collection(db, "users", currentUser.uid, "boards", boardId, "notes");
    const unsubscribe = onSnapshot(notesRef, (snapshot) => {
      setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe; // To clean up listener when component unmounts
  };

  const addNote = async (boardId, content) => {
    if (!boardId || !content) return;

    const notesRef = collection(db, "users", currentUser.uid, "boards", boardId, "notes");
    await addDoc(notesRef, { content });
  };

  const deleteNote = async (boardId, noteId) => {
    if (!boardId || !noteId) return;

    const noteRef = doc(db, "users", currentUser.uid, "boards", boardId, "notes", noteId);
    await deleteDoc(noteRef);
  };

  return (
    <NoteContext.Provider value={{ notes, fetchNotes, addNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
}
