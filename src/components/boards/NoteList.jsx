import React from 'react';

export default function NoteList({ notes, deleteNote }) {
  return (
    <div className="container">
      <h2>Notes</h2>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <span>{note.content}</span>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
