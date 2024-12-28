import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
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

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onSnapshot(
      collection(db, "users", currentUser.uid, "notes"),
      (snapshot) => {
        setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    );

    return unsubscribe;
  }, [currentUser]);

  const addNote = async (content) => {
    await addDoc(collection(db, "users", currentUser.uid, "notes"), { content });
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "users", currentUser.uid, "notes", id));
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
}
