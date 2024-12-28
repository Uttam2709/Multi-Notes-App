import React, { useState } from "react";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import NoteItem from "./NoteItem";
import { useNote } from "../../contexts/NoteContext"; // Updated to useNote

export default function NoteManager({ boardId }) {
  const { notes, addNote, deleteNote } = useNote(); // Updated to useNote
  const [editNoteId, setEditNoteId] = useState(null);

  const notesForBoard = notes.filter((note) => note.boardId === boardId);

  return (
    <div>
      <h3>Notes</h3>
      <AddNote boardId={boardId} />
      {notesForBoard.map((note) =>
        editNoteId === note.id ? (
          <EditNote
            key={note.id}
            note={note}
            onSave={(newContent) => {
              // You can call updateNote here if it's available in the NoteContext
              addNote(newContent); // Use addNote as an example (you can adjust logic if needed)
              setEditNoteId(null);
            }}
            onCancel={() => setEditNoteId(null)}
          />
        ) : (
          <NoteItem
            key={note.id}
            note={note}
            onEdit={() => setEditNoteId(note.id)}
            onDelete={() => deleteNote(note.id)}
          />
        )
      )}
    </div>
  );
}
