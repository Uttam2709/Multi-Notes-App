// components/notes/NoteEdit.jsx
import React, { useState } from "react";

const NoteEdit = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");

  const handleSave = () => {
    onSave({ ...note, title, content });
  };

  return (
    <div className="note-edit">
      <h2>Edit Note</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <div className="actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default NoteEdit;
