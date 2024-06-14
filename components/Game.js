"use client";

import { useState } from "react";
import {
  STATUS_TURN_O,
  STATUS_TURN_X,
  STATUS_WIN_O,
  STATUS_WIN_X,
  emptyField,
  makeMove,
  statuses,
} from "./utils/game";
import Square from "./Square";

const Game = () => {
  const [squares, setSquares] = useState(emptyField);
  const [gameState, setGameState] = useState(STATUS_TURN_X);

  const handleClick = (index) => {
    // is somebody already won then can't click
    if (gameState === STATUS_WIN_X || gameState === STATUS_WIN_O) {
      return;
    }
    const { newGameState, newSquares } = makeMove(gameState, squares, index);
    setSquares(newSquares);
    setGameState(newGameState);
    // automatically make a move for the computer
    if ([STATUS_TURN_X, STATUS_TURN_O].includes(newGameState)) {
      // find the first empty square
      const emptyIndeces = newSquares.reduce((acc, square, index) => {
        if (square === null) {
          acc.push(index);
        }
        return acc;
      }, []);
      const emptyIndex =
        emptyIndeces[Math.floor(Math.random() * emptyIndeces.length)];
      const { newGameState: newGameState2, newSquares: newSquares2 } = makeMove(
        newGameState,
        newSquares,
        emptyIndex
      );
      setSquares(newSquares2);
      setGameState(newGameState2);
    }
  };

  const handleRestart = () => {
    setSquares(emptyField);
    setGameState(STATUS_TURN_X);
  };

  return (
    <div className="full-page flex-col gap-3">
      <h1 className="text-l font-bold">Tic Tac Toe</h1>
      <div className="board flex flex-wrap w-48">
        {squares.map((value, index) => (
          <div
            className="square w-16 h-16 border p-1 flex justify-center items-center"
            key={index}
          >
            <Square
              value={value}
              onClick={(e) => {
                handleClick(index);
              }}
            />
          </div>
        ))}
      </div>
      <div className="status italic">{statuses[gameState]}</div>
      <button
        className="restart border p-1 rounded bg-black text-white"
        onClick={handleRestart}
      >
        Restart Game
      </button>
    </div>
  );
};

export default Game;
