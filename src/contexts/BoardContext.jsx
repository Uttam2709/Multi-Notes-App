import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const BoardContext = createContext();

export function useBoard() {
  return useContext(BoardContext);
}

export function BoardProvider({ children }) {
  const { currentUser } = useAuth();
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "boards"),
      where("userId", "==", currentUser.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setBoards(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, [currentUser]);

  const addBoard = async (name) => {
    await addDoc(collection(db, "boards"), { name, userId: currentUser.uid });
  };

  const deleteBoard = async (id) => {
    await deleteDoc(doc(db, "boards", id));
  };

  const updateBoardName = async (id, newName) => {
    const boardRef = doc(db, "boards", id);
    await updateDoc(boardRef, { name: newName });
  };

  const getBoards = async () => {
    const q = query(
      collection(db, "boards"),
      where("userId", "==", currentUser.uid)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        addBoard,
        deleteBoard,
        updateBoardName,
        getBoards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
