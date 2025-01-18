import React from "react";

const NoteList = ({ items, type, onSelect, onEdit, onDelete }) => {
  return (
    <div className="item-list">
      {items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className={type === "note" ? "note-item" : "board-item"}>
            <h3>{type === "note" ? item.title : item.name}</h3>
            <p>{item.content || item.description}</p>
            <div className="actions">
              {type === "note" && (
                <button onClick={() => onEdit(item)}>Edit</button>
              )}
              {type === "board" && (
                <button onClick={() => onSelect(item.id)}>View</button>
              )}
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p>No {type === "note" ? "notes" : "boards"} available.</p>
      )}
    </div>
  );
};

export default NoteList;
