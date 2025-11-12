import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import EndPage from "./EndPage";
import "./App.css";

const SIZE = 4;
const TARGET = 2048;
function defaultGrid() { return Array(SIZE * SIZE).fill(0); }
function addRandom(grid) {
  const emptyIndices = grid.map((v, i) => (v === 0 ? i : null)).filter(i => i !== null);
  if (emptyIndices.length === 0) return grid;
  const idx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  const newGrid = [...grid];
  newGrid[idx] = value;
  return newGrid;
}
function moveLeft(grid) {
  let newGrid = [], moveScore = 0, merged = false;
  for (let r = 0; r < SIZE; r++) {
    let row = grid.slice(r * SIZE, (r + 1) * SIZE);
    row = row.filter(val => val !== 0);
    while (row.length < SIZE) row.push(0);
    for (let c = 0; c < SIZE - 1; c++) {
      if (row[c] !== 0 && row[c] === row[c + 1]) {
        row[c] *= 2;
        moveScore += row[c];
        row[c + 1] = 0;
        merged = true;
      }
    }
    row = row.filter(val => val !== 0);
    while (row.length < SIZE) row.push(0);
    newGrid = newGrid.concat(row);
  }
  return { grid: newGrid, score: moveScore, merged };
}
function moveRight(grid) {
  let newGrid = [], moveScore = 0, merged = false;
  for (let r = 0; r < SIZE; r++) {
    let row = grid.slice(r * SIZE, (r + 1) * SIZE).reverse();
    row = row.filter(val => val !== 0);
    while (row.length < SIZE) row.push(0);
    for (let c = 0; c < SIZE - 1; c++) {
      if (row[c] !== 0 && row[c] === row[c + 1]) {
        row[c] *= 2;
        moveScore += row[c];
        row[c + 1] = 0;
        merged = true;
      }
    }
    row = row.filter(val => val !== 0);
    while (row.length < SIZE) row.push(0);
    newGrid = newGrid.concat(row.reverse());
  }
  return { grid: newGrid, score: moveScore, merged };
}
function transpose(grid) {
  let newGrid = Array(SIZE * SIZE).fill(0);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      newGrid[c * SIZE + r] = grid[r * SIZE + c];
    }
  }
  return newGrid;
}
function moveUp(grid) {
  let transposed = transpose(grid);
  const { grid: moved, score, merged } = moveLeft(transposed);
  return { grid: transpose(moved), score, merged };
}
function moveDown(grid) {
  let transposed = transpose(grid);
  const { grid: moved, score, merged } = moveRight(transposed);
  return { grid: transpose(moved), score, merged };
}
function isGameOver(grid) {
  for (let i = 0; i < SIZE * SIZE; i++) {
    if (grid[i] === 0) return false;
    const r = Math.floor(i / SIZE), c = i % SIZE;
    if (c < SIZE - 1 && grid[i] === grid[i + 1]) return false;
    if (r < SIZE - 1 && grid[i] === grid[i + SIZE]) return false;
  }
  return true;
}
function hasWon(grid) {
  return grid.some(val => val === TARGET);
}

function GameBoard() {
  const [grid, setGrid] = useState(defaultGrid());
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasWin, setHasWin] = useState(false);
  const [animateTiles, setAnimateTiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let g = addRandom(grid);
    g = addRandom(g);
    setGrid(g);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (isGameOver(grid) && !hasWin) {
      setGameOver(true);
      setTimeout(() => {
        navigate("/end", { state: { score, win: false } });
      }, 400);
    }
    if (hasWon(grid)) {
      setHasWin(true);
      setTimeout(() => {
        navigate("/end", { state: { score, win: true } });
      }, 400);
    }
  }, [grid, hasWin, score, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver || hasWin) return;
      let result;
      if (e.key === "ArrowLeft") {
        result = moveLeft(grid);
      } else if (e.key === "ArrowRight") {
        result = moveRight(grid);
      } else if (e.key === "ArrowUp") {
        result = moveUp(grid);
      } else if (e.key === "ArrowDown") {
        result = moveDown(grid);
      } else {
        return;
      }
      if (JSON.stringify(result.grid) !== JSON.stringify(grid)) {
        setGrid(addRandom(result.grid));
        setScore((prev) => prev + result.score);
        if (result.merged) {
          let animTiles = [];
          result.grid.forEach((val, i) => {
            if (val >= 4 && grid[i] !== val) animTiles.push(i);
          });
          setAnimateTiles(animTiles);
          setTimeout(() => setAnimateTiles([]), 350);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid, gameOver, hasWin]);

  const gridRows = [];
  for (let r = 0; r < SIZE; r++) {
    gridRows.push(grid.slice(r * SIZE, (r + 1) * SIZE));
  }
  return (
    <div className="game-outer">
      <div className="game-container">
        <h1 className="main-title">2048 Game</h1>
        <div className="score">Score: <span>{score}</span></div>
        <div className="real-grid">
          {gridRows.map((row, rowIdx) => (
            <div className="row" key={rowIdx}>
              {row.map((val, colIdx) => {
                const i = rowIdx * SIZE + colIdx;
                return (
                  <div
                    className={
                      "tile" +
                      (val ? ` tile-${val}` : " tile-empty") +
                      (animateTiles.includes(i) ? " merged" : "")
                    }
                    key={colIdx}
                  >
                    {val !== 0 ? val : ""}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <p className="hint">Use arrow keys to play!</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GameBoard />} />
      <Route path="/end" element={<EndPage />} />
    </Routes>
  );
}
