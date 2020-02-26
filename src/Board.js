import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=2, ncols=2, chanceLightStartsOn=.5}) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    // DONE; (refactor though)
    for(let i = 0; i < nrows; i++) {
      initialBoard.push([]);
      for(let j = 0; j < ncols; j++) {
        initialBoard[i].push(Math.random() <= chanceLightStartsOn ? true : false);
      }
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    // DONE (refactor though)

    let flatArray = board.flat();
    if (flatArray.some(cell => cell === false)) return false;


    // Method 4
    // let flatArray = board.flat();
    // if (flatArray.find(cell => cell === false) === false) return false;


    // Method 3
    // let flatArray = board.flat();
    // if ((flatArray.filter(cell => cell === false)).length) return false;

    // Method 2
    // for (let row of board) {
    //   if(row.find(cellVal => cellVal === false) === false) {
    //     return false;
    //   };
    // }

    // Method 1
    // for(let i = 0; i < nrows; i++) {
    //   for(let j = 0; j < ncols; j++) {
    //     if(!board[i][j]) return false;
    //   }
    // }

    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = oldBoard.map(row => row.map(cell => cell));

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x, newBoard);
      flipCell(y+1,x, newBoard);
      flipCell(y-1,x, newBoard);
      flipCell(y,x+1, newBoard);
      flipCell(y,x-1, newBoard);

      // TODO: return the copy
      return newBoard;
    });
  }




  // TODO
  let tableboard = board.map((row, rowInd) => 
    <tr>
      {row.map((cellVal, cellInd) => 
        <Cell isLit={cellVal} flipCellsAroundMe={() => flipCellsAround(`${rowInd}-${cellInd}`)} />)
      }
    </tr>
  );


  // TODO
  // if the game is won, just show a winning msg & render nothing else
  //DONE

  return (
    <div>
      <h1>Lights Out Game</h1>
      {hasWon() ? 
        <p>You Won!</p> : 
        <table>{tableboard}</table>
      }
    </div>
  )

}

export default Board;
