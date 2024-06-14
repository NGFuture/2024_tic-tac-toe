export const SQUARE_X = 2;
export const SQUARE_O = 1;
export const SQUARE_EMPTY = null;
export const STATUS_TURN_X = "STATUS_TURN_X";
export const STATUS_TURN_O = "STATUS_TURN_O";
export const STATUS_WIN_X = "STATUS_WIN_X";
export const STATUS_WIN_O = "STATUS_WIN_O";
export const STATUS_DRAW = "STATUS_DRAW";

export const checkWin = (player, squares) => {
    const winLines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
    ]
    return winLines.some(line => line.every(index => squares[index] === player))
}

export const statuses = {
    [STATUS_TURN_X]: "Player X's turn",
    [STATUS_TURN_O]: "Player O's turn",
    [STATUS_WIN_X]: "Player X wins",
    [STATUS_WIN_O]: "Player O wins",
    [STATUS_DRAW]: "It's a draw"
};

export const emptyField = [
    null, null, null,
    null, null, null,
    null, null, null
] 

export const makeMove = (gameState, squares, index) => {
    // depending on the current player (gameState) we will set the value of the square in the squares array
    const currentPlayer = gameState === STATUS_TURN_X ? SQUARE_X : SQUARE_O
    const newSquares = [...squares]
    newSquares[index] = currentPlayer

    // check if the game is over
    const isCurrentPlayerWin = checkWin(currentPlayer, newSquares)
    if (isCurrentPlayerWin) {
        return {newSquares, newGameState: currentPlayer === SQUARE_X ? STATUS_WIN_X : STATUS_WIN_O}
    }
    const isDraw = newSquares.every(square => square !== null)
    if (isDraw) {
        return { newSquares, newGameState: STATUS_DRAW }
    }
    // if the game is not over then we switch the player
    return { newSquares, newGameState: currentPlayer === SQUARE_X ? STATUS_TURN_O : STATUS_TURN_X }
}