const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameButton = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

// winning combinaations
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// initializing game
function initGame() {
  currentPlayer = "X";
  newGameButton.classList.remove("active");
  gameInfo.classList.remove("scaleClass");
  // emptying grid
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  // emptying grid on UI
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    // adding classes that were at the start of game
    box.classList = `box box${index + 1}`;
  });

  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }

  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

// MAGIC LOGIC
function checkGameOver() {
  let answer = "";

  //   checking winning conditionuntil we find a match 
  winningPositions.forEach((position) => {
    // all three boxes should be non empty and should have same value of X/O
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      // check if winner is X or O
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      // disable pointer events
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      // highlightning winner boxes
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }

    // if you have a winner
    if (answer !== "") {
      gameInfo.innerText = `Winner is Player - ${answer}`;
      gameInfo.classList.add("scaleClass");

      // gameInfo.style.transform = scale(1);

      newGameButton.classList.add("active");
      return;
    }

    // lets check for tie

    let fillCount = 0;
    gameGrid.forEach((box) => {
      if (box !== "") {
        fillCount++;
      }
    });

    if (fillCount == 9) {
      gameInfo.innerText = "Game Tied!!!";
      // gameInfo.style.transform= "scale(1)";
      gameInfo.classList.add("scaleClass");
      newGameButton.classList.add("active");
    }
  });

  // newGameButton.classList.add("active");
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    // change in UI
    boxes[index].innerText = currentPlayer;
    // change in our grid value
    gameGrid[index] = currentPlayer;
    // removing curser
    boxes[index].style.pointerEvents = "none";
    // swap player turn
    swapTurn();
    // ckeck for win
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

// reseting current game
newGameButton.addEventListener("click", initGame);
