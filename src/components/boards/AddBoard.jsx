import React, { useRef } from "react";
import "../../assets/CustomStyle.css";
import { useBoard } from "../../contexts/BoardContext";

export default function AddBoard() {
  const nameRef = useRef();
  const { addBoard } = useBoard();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBoard(nameRef.current.value);
      nameRef.current.value = "";
    } catch {
      alert("Failed to add board");
    }
  };

  return (
    <>
      <div className="mb-5">
      <form className="row" onSubmit={handleSubmit}>
        <div>
          <input ref={nameRef} type="text" placeholder="Board Name" required />
          <button type="submit">Add Board</button>
        </div>
      </form>
      </div>
    </>
  );
}
