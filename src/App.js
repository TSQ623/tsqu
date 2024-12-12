import React, { useState } from 'react';
import Board from './Board';
import './App.css';

const EMPTY_CELL = '';

function App() {
  const [board, setBoard] = useState(
    Array.from({ length: 10 }, () => Array(10).fill(EMPTY_CELL))
  );
  const [currentPlayer, setCurrentPlayer] = useState('🔴');
  const [winner, setWinner] = useState(null);

  const handleClick = (row, col) => {
    if (winner || board[row][col] !== EMPTY_CELL) return;

    const newBoard = board.map((r) => r.slice());
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    const newWinner = checkWinner(newBoard, row, col);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      togglePlayer();
    }
  };

  const togglePlayer = () => {
    setCurrentPlayer(currentPlayer === '🔴' ? '🔵' : '🔴');
  };

  const checkWinner = (board, row, col) => {
    const player = board[row][col];
    const directions = [
      [1, 0], // 横向
      [0, 1], // 纵向
      [1, 1], // 主对角线
      [1, -1], // 副对角线
    ];

    for (const [dx, dy] of directions) {
      let count = 1;
      let line = [`${row}-${col}`];

      // 向一个方向搜索
      let r = row + dx;
      let c = col + dy;
      while (r >= 0 && r < 10 && c >= 0 && c < 10 && board[r][c] === player) {
        count++;
        line.push(`${r}-${c}`);
        r += dx;
        c += dy;
      }

      // 向相反方向搜索
      r = row - dx;
      c = col - dy;
      while (r >= 0 && r < 10 && c >= 0 && c < 10 && board[r][c] === player) {
        count++;
        line.push(`${r}-${c}`);
        r -= dx;
        c -= dy;
      }

      if (count >= 5) {
        return { player, line };
      }
    }

    return null;
  };

  const resetGame = () => {
    setBoard(Array.from({ length: 10 }, () => Array(10).fill(EMPTY_CELL)));
    setCurrentPlayer('🔴');
    setWinner(null);
  };

  return (
    <div className="App">
      <h1>五子棋游戏</h1>
      <Board board={board} handleClick={handleClick} winner={winner} />
      <div className="info">
        当前玩家: {currentPlayer}
        {winner && (
          <div>
            玩家 <strong>{winner.player}</strong> 获胜!
            <button onClick={resetGame}>重新开始</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;