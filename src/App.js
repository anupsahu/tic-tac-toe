import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [value, setValue] = useState(Array(9).fill(null));
  const [xIsNext, setxIsNext] = useState(true);

  const winner = calculateWinner(value);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  const handleClick = (i) => {
    if (value[i] || calculateWinner(value)) return;
    const squares = value.slice();
    if (xIsNext) {
      squares[i] = "X";
    } else {
      squares[i] = "O";
    }
    setValue(squares);
    setxIsNext(!xIsNext);
  };

  const reset = () => {
    setValue(Array(9).fill(null));
    setxIsNext(true);
  };
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={value[0]} onSquareClick={() => handleClick(0)} />
        <Square value={value[1]} onSquareClick={() => handleClick(1)} />
        <Square value={value[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={value[3]} onSquareClick={() => handleClick(3)} />
        <Square value={value[4]} onSquareClick={() => handleClick(4)} />
        <Square value={value[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={value[6]} onSquareClick={() => handleClick(6)} />
        <Square value={value[7]} onSquareClick={() => handleClick(7)} />
        <Square value={value[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <button onClick={reset}>Reset</button>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
