// src/contexts/NoteContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';

const NoteContext = createContext();

export const useNote = () => useContext(NoteContext);

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onSnapshot(
      collection(db, 'users', currentUser.uid, 'notes'),
      snapshot => {
        setNotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }
    );

    return unsubscribe;
  }, [currentUser]);

  const addNote = content =>
    addDoc(collection(db, 'users', currentUser.uid, 'notes'), { content });

  const deleteNote = id =>
    deleteDoc(doc(db, 'users', currentUser.uid, 'notes', id));

  return <NoteContext.Provider value={{ notes, addNote, deleteNote }}>{children}</NoteContext.Provider>;
}
