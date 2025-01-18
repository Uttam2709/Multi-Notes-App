import React, { useState } from "react";
import AddNote from "./AddNote";
import NoteEdit from "./NoteEdit";
import NoteItem from "./NoteItem";
import { useNote } from "../contexts/NoteContext";

export default function NoteManager({ boardId }) {
  const { notes, fetchNotes, addNote, deleteNote } = useNote();
  const [NoteEditId, setNoteEditId] = useState(null);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const unsubscribe = fetchNotes(boardId);
    return () => unsubscribe && unsubscribe();
  }, [boardId]);

  const handleAddNote = async () => {
    if (newNote.trim()) {
      await addNote(boardId, newNote);
      setNewNote("");
    }
  };

  const handleSaveNote = async (updatedNote) => {
    await updateNote(boardId, updatedNote);
    setEditingNote(null);
  };
  
  const notesForBoard = notes.filter((note) => note.boardId === boardId);

  return (
    <div>
      <h3>Notes</h3>
      <AddNote boardId={boardId} />
      {notesForBoard.map((note) =>
        NoteEditId === note.id ? (
          <NoteEdit
            key={note.id}
            note={note}
            onSave={(newContent) => {
              addNote(newContent);
              setNoteEditId(null);
            }}
            onCancel={() => setNoteEditId(null)}
          />
        ) : (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={() => setNoteEditId(note.id)}
            onDelete={() => deleteNote(note.id)}
          />
        )
      )}
    </div>
  );
}
