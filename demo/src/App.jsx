import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const puzzle = [
  [5, 3, "", "", 7, "", "", "", ""],
  [6, "", "", 1, 9, 5, "", "", ""],
  ["", 9, 8, "", "", "", "", 6, ""],
  [8, "", "", "", 6, "", "", "", 3],
  [4, "", "", 8, "", 3, "", "", 1],
  [7, "", "", "", 2, "", "", "", 6],
  ["", 6, "", "", "", "", 2, 8, ""],
  ["", "", "", 4, 1, 9, "", "", 5],
  ["", "", "", "", 8, "", "", 7, 9],
];

function App() {
  const [board, setBoard] = useState(
    puzzle.map(row => [...row])
  );

  const handleChange = (row, col, value) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const newBoard = board.map((r, rIndex) =>
        r.map((c, cIndex) =>
          rIndex === row && cIndex === col ? value : c
        )
      );
      setBoard(newBoard);
    }
  };

  const isValidSet = (arr) => {
    const nums = arr.filter(n => n !== "");
    return new Set(nums).size === nums.length;
  };

  const checkSudoku = () => {
    // Check Rows
    for (let row = 0; row < 9; row++) {
      if (!isValidSet(board[row])) {
        alert("Row Error ❌");
        return;
      }
    }

    // Check Columns
    for (let col = 0; col < 9; col++) {
      let column = [];
      for (let row = 0; row < 9; row++) {
        column.push(board[row][col]);
      }
      if (!isValidSet(column)) {
        alert("Column Error ❌");
        return;
      }
    }

    // Check 3x3 Boxes
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        let box = [];
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            box.push(board[boxRow * 3 + row][boxCol * 3 + col]);
          }
        }
        if (!isValidSet(box)) {
          alert("3x3 Box Error ❌");
          return;
        }
      }
    }

    alert("Sudoku Looks Good! 🎉");
  };

  const resetGame = () => {
    setBoard(puzzle.map(row => [...row]));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Sudoku Game</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 45px)",
          justifyContent: "center",
          gap: "3px",
          margin: "20px 0"
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <input
              key={`${rowIndex}-${colIndex}`}
              type="text"
              maxLength="1"
              value={cell}
              disabled={puzzle[rowIndex][colIndex] !== ""}
              onChange={(e) =>
                handleChange(rowIndex, colIndex, e.target.value)
              }
              style={{
                width: "45px",
                height: "45px",
                textAlign: "center",
                fontSize: "18px",
                fontWeight:
                  puzzle[rowIndex][colIndex] !== "" ? "bold" : "normal",
                backgroundColor:
                  puzzle[rowIndex][colIndex] !== "" ? "#e0e0e0" : "white",
                border: "1px solid black"
              }}
            />
          ))
        )}
      </div>

      <button
        onClick={checkSudoku}
        style={{
          padding: "8px 15px",
          marginRight: "10px",
          cursor: "pointer"
        }}
      >
        Check
      </button>

      <button
        onClick={resetGame}
        style={{
          padding: "8px 15px",
          cursor: "pointer"
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default App;

