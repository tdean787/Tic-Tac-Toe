const gameBoardDOM = document.getElementById("gameboard");
const resetButton = document.querySelector("#reset");
const score1Output = document.querySelector("#score-1-output");
const score2Output = document.querySelector("#score-2-output");
const gameResult = document.querySelector(".gameResult");
const setPlayersButton = document.querySelector(".setNames");

let user1 = null;
let user2 = null;

setPlayersButton.addEventListener("click", function () {
  const player1Name = document.querySelector(".player1Name");
  const player2Name = document.querySelector(".player2Name");
  user1 = player(player1Name.value, "X");
  user2 = player(player2Name.value, "O");
  console.log(player2Name.value);
  return { user1, user2 };
});
// const user1 = player("player 1", "X");
// const user2 = player("player 2", "O");

const player = (name, symbol) => {
  const getSymbol = () => symbol;
  const getName = () => name;
  const score = 0;
  return {
    getName,
    getSymbol,
    score,
  };
};

const checkWinner = function (array) {
  const user1Result = array.filter((row) => row == user1.getSymbol());
  const user2Result = array.filter((row) => row == user2.getSymbol());
  if (user1Result.length == 3) {
    gameResult.innerHTML = `${user1.getName()} is the winner!`;

    user1.score += 1;
    score1Output.innerHTML = user1.score;
    resetGameboardArray();
  } else if (user2Result.length == 3) {
    gameResult.innerHTML = `${user2.getName()} is the winner!`;
    user2.score += 1;
    score2Output.innerHTML = user2.score;
    resetGameboardArray();
  }
};

const checkTie = function () {
  if (gameBoard.gameboard.includes(0)) {
    console.log("game ongoing");
  } else {
    gameResult.innerHTML = "Game is a tie!";
  }
};

const gameBoard = {
  gameboard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
  playerTurn: "player1",
};

const renderGameboard = (function () {
  for (let i = 0; i < gameBoard.gameboard.length; i++) {
    let div = document.createElement("div");
    // div.innerHTML = "";
    div.className = `Box`;
    div.id = i;
    gameBoardDOM.appendChild(div);
  }
})();

const displayController = (element) => {
  //check to see if the box has already been clicked
  if (element.target.innerHTML != "X" && element.target.innerHTML != "O") {
    if (gameBoard.playerTurn == "player1") {
      element.target.innerHTML = user1.getSymbol();
      gameBoard.playerTurn = "player2";
      gameBoard.gameboard[element.target.id] = "X";
    } else if (gameBoard.playerTurn == "player2") {
      element.target.innerHTML = user2.getSymbol();
      gameBoard.playerTurn = "player1";
      gameBoard.gameboard[element.target.id] = "O";
    }
  } else {
    //if the above condition is not true return and prevent entering a symbol on already clicked
    return;
  }

  let { diag1, diag2, row1, row2, row3, col1, col2, col3 } = boardArrayInit();
  checkWinner(diag1);
  checkWinner(diag2);
  checkWinner(row1);
  checkWinner(row2);
  checkWinner(row3);
  checkWinner(col1);
  checkWinner(col2);
  checkWinner(col3);
  checkTie();
};

document.getElementById("gameboard").addEventListener("click", function (e) {
  displayController(e);
});

resetButton.addEventListener("click", function () {
  let boxes = document.querySelectorAll(".Box");
  boxes.forEach((element) => (element.innerHTML = ""));
  gameBoard.playerTurn = "player1";
  gameResult.innerHTML = "";
});

function resetGameboardArray() {
  gameBoard.gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function boardArrayInit() {
  let row1 = gameBoard.gameboard.slice(0, 3);
  let row2 = gameBoard.gameboard.slice(3, 6);
  let row3 = gameBoard.gameboard.slice(6, 9);
  let col1 = [];
  let col2 = [];
  let col3 = [];
  let diag1 = [];
  let diag2 = [];
  for (let i = 0; i < gameBoard.gameboard.length; i += 3) {
    col1.push(gameBoard.gameboard[i]);
  }
  for (let i = 1; i < gameBoard.gameboard.length; i += 3) {
    col2.push(gameBoard.gameboard[i]);
  }
  for (let i = 2; i < gameBoard.gameboard.length; i += 3) {
    col3.push(gameBoard.gameboard[i]);
  }
  for (let i = 0; i < gameBoard.gameboard.length; i += 4) {
    diag1.push(gameBoard.gameboard[i]);
  }
  for (let i = 2; i < 8; i += 2) {
    diag2.push(gameBoard.gameboard[i]);
  }
  return { diag1, diag2, row1, row2, row3, col1, col2, col3 };
}
