import React, { useRef } from 'react';

export default function AddNote({ addNote }) {
  const noteRef = useRef();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addNote(noteRef.current.value);
      noteRef.current.value = '';
    } catch {
      alert('Failed to add note');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input className= "form-control" ref={noteRef} type="text" placeholder="Note Content" required />
      <button type="submit">Add Note</button>
    </form>
  );
}
