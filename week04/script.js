
const resultMessage = document.querySelector('#resultsMessage');
let gameSlots = ["", "", "", "", "", "", "", "", ""];
let gameRunning = true;
let currentPlayer = "X";

const validateMove = () => {
  const winningConditions = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6]
  ];

  let wonGame = false;

  for (let i = 0; i <= winningConditions.length - 1; i++) {
    const winCondition = winningConditions[i];
    const horizontal = gameSlots[winCondition[0]];
    const vertical = gameSlots[winCondition[1]];
    const diagonal = gameSlots[winCondition[2]];

    if (horizontal === '' || vertical === '' || diagonal === '') {
      continue;
    }
    if (horizontal === vertical && vertical === diagonal) {
      wonGame = true;
      break
    }
  }

  if (wonGame) {
    resultMessage.innerHTML = `Player ${currentPlayer === 'X' ? '1' : '2'} has won!`;
    gameRunning = false;
    return;
  }

  const drawGame = !gameSlots.includes("");

  if (drawGame) {
    resultMessage.innerHTML = `Game ended in a draw!`;
    gameRunning = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  resultMessage.innerHTML = `It's ${currentPlayer === 'X' ? 'Player 1' : 'Player 2'} turn`;
}

function resetGame() {
  gameSlots = ["", "", "", "", "", "", "", "", ""];
  gameRunning = true;
  currentPlayer = "X";
  resultMessage.innerHTML = `It's Player 1 turn`;
  gameSlots.forEach((e, i) => {
    document.querySelector(`#block_${i}`).innerHTML = "";
  });
}

const handleSlotSelection = (slot, slotIndex) => {
  gameSlots[slotIndex] = currentPlayer;
  slot.innerHTML = currentPlayer;
  validateMove();
}

const handleSlotClick = (event) => {
  const slot = event.target;
  const slotIndex = parseInt(slot.getAttribute('id').replace('block_', ''));

  if (gameSlots[slotIndex] !== "" || !gameRunning) return;

  handleSlotSelection(slot, slotIndex);
};

const renderGame = () => {
  gameSlots.forEach((e, i) => {
    document.querySelector(`#block_${i}`).addEventListener('click', handleSlotClick)
  });
};

renderGame();