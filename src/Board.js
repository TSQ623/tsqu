import React from 'react';
import './Board.css';

const Board = ({ board, handleClick, winner }) => {
  const getClassName = (row, col) => {
    if (winner && winner.line.includes(`${row}-${col}`)) {
      return 'cell winning-cell';
    }
    return 'cell';
  };

  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getClassName(rowIndex, colIndex)}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;