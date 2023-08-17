let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameOver = false;
let xScore = 0;
let oScore = 0;

function makeMove(index) {
  if (!gameOver && board[index] === "") {
    board[index] = currentPlayer;
    document.getElementsByClassName("cell")[index].innerHTML = currentPlayer;
    checkWinner();
    togglePlayer();
    updateMessage();
  }
}

function checkWinner() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      declareWinner(currentPlayer);
      return;
    }
  }

  if (board.every(cell => cell !== "")) {
    declareDraw();
  }
}

function declareWinner(player) {
  gameOver = true;
  if (player === "X") {
    xScore++;
  } else {
    oScore++;
  }
  updateScore();
  updateMessage(`Jogador ${player} venceu!`);
}

function declareDraw() {
  gameOver = true;
  updateMessage("Empate!");
}

function togglePlayer() {
  currentPlayer = (currentPlayer === "X") ? "O" : "X";
}

function updateMessage(message = "") {
  document.getElementById("status").textContent = (message === "") ? "" : `Vez do Jogador ${currentPlayer} - ${message}`;
}

function updateScore() {
  document.getElementById("score").textContent = `Placar: X - ${xScore}, O - ${oScore}`;
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
  updateMessage();
}

function resetScore() {
  xScore = 0;
  oScore = 0;
  updateScore();
}

updateScore();
