import { useEffect, useState } from "react";

function App() {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState([
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  const handleClick = (e: any) => {
    if (gameOver) return;
    const row = e.target.dataset.rowindex;
    let column = board[row].lastIndexOf("");
    if (column < 0) {
      alert("Please select different Column!");
      return;
    }

    setBoard((prev) => {
      const board = [...prev];
      board[row][column] = player;
      return board;
    });

    setPlayer((player) => (player === "X" ? "O" : "X"));
  };

  // const checkBoard = () => {
  //   let canContinue = false;
  //   for (let c = 0; c < 7; c++) {
  //     if (board[c][0] === "") {
  //       canContinue = true;
  //     }
  //   }

  //   setGameOver(!canContinue);
  // };

  const checkWinner = () => {
    //column check or Vertical Check
    for (let c = 0; c < 7; c++) {
      for (let r = 0; r <= 6 - 4; r++) {
        if (
          board[c][r] !== "" &&
          board[c][r] === board[c][r + 1] &&
          board[c][r + 1] === board[c][r + 2] &&
          board[c][r + 2] === board[c][r + 3]
        ) {
          setGameOver(true);
          return;
        }
      }
    }

    //row check or horizontal Check
    for (let c = 0; c <= 7 - 4; c++) {
      for (let r = 0; r < 6; r++) {
        if (
          board[c][r] !== "" &&
          board[c][r] === board[c + 1][r] &&
          board[c + 1][r] === board[c + 2][r] &&
          board[c + 2][r] === board[c + 3][r]
        ) {
          setGameOver(true);
          return;
        }
      }
    }

    //diagonal row - Top to Bottom
    for (let c = 0; c < 7 - 3; c++) {
      for (let r = 0; r < 6 - 3; r++) {
        if (
          board[c][r] !== "" &&
          board[c][r] === board[c + 1][r + 1] &&
          board[c + 1][r + 1] === board[c + 2][r + 2] &&
          board[c + 2][r + 2] === board[c + 3][r + 3]
        ) {
          setGameOver(true);
          return;
        }
      }
    }

    //diagonal row - Bottom To Top
    for (let c = 0; c < 7 - 3; c++) {
      for (let r = 5; r >= 3; r--) {
        if (
          board[c][r] !== "" &&
          board[c][r] === board[c + 1][r - 1] &&
          board[c + 1][r - 1] === board[c + 2][r - 2] &&
          board[c + 2][r - 2] === board[c + 3][r - 3]
        ) {
          setGameOver(true);
          return;
        }
      }
    }
  };

  const resetBoard = (e: any) => {
    e.preventDefault();
    setPlayer("X");
    setBoard([
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
      ["", "", "", "", "", ""],
    ]);
    setGameOver(false);
    setWinner("");
  };

  useEffect(() => {
    gameOver && setWinner(player === "X" ? "O" : "X");
  }, [gameOver]);

  useEffect(() => {
    checkWinner();
    // checkBoard();
  }, [board]);

  return (
    <>
      <h1>Play Connect4</h1>
      {gameOver && (
        <>
          <h2 className={`${winner === "X" ? "red" : "yellow"}`}>{`${
            winner === "X" ? "Red" : "Yellow"
          } Won the game!`}</h2>
          <button className="resetButton" onClick={resetBoard}>
            Start New Game
          </button>
        </>
      )}
      {!gameOver && (
        <h2 className={`${player === "X" ? "red" : "yellow"}`}>{`${
          player === "X" ? "Red" : "Yellow"
        } Turn!`}</h2>
      )}
      <div className="board" onClick={handleClick}>
        {board.map((row, rowIndex) => (
          <ul key={rowIndex}>
            {row.map((column, columnIndex) => {
              return (
                <li
                  className={
                    !!column ? (column === "X" ? "red" : "yellow") : ""
                  }
                  data-rowindex={rowIndex}
                  key={`${rowIndex}r${columnIndex}`}
                ></li>
              );
            })}
          </ul>
        ))}
      </div>
    </>
  );
}

export default App;
