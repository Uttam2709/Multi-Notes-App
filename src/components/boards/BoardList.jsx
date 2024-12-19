import React from 'react';
import { useBoard } from '../../contexts/BoardContext';
import '../../assets/CustomStyle.css';


export default function BoardList() {
  const { boards, deleteBoard } = useBoard();

  return (
    <div className="container">
      <h2 className='text-success m-5'>Boards</h2>
      <ul>
        {boards.map(board => (
          <li key={board.id}>
            <span>{board.name}</span>
            <button className='btn btn-success ms-3' onClick={() => deleteBoard(board.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
