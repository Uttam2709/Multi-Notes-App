import React, { useState } from "react";
import AddNote from "./AddNote";
import NoteEdit from "./NoteEdit";
import NoteItem from "./NoteItem";
import { useNote } from "../contexts/NoteContext"; // Updated to useNote

export default function NoteManager({ boardId }) {
  const { notes, addNote, deleteNote } = useNote(); // Updated to useNote
  const [NoteEditId, setNoteEditId] = useState(null);

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
