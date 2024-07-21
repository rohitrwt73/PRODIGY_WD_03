let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; // true for 'O', false for 'X'
let count = 0; //To Track Draw
let gameMode = 'human'; // Default game mode

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Initial setup for game mode selection
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('game-mode-modal');
  const humanVsHumanBtn = document.getElementById('human-vs-human');
  const humanVsAIBtn = document.getElementById('human-vs-ai');

  // Event listeners for mode buttons
  humanVsHumanBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    gameMode = 'human';
    startGame();
  });

  humanVsAIBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    gameMode = 'ai';
    startGame();
  });
});

const startGame = () => {
  resetGame();
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.disabled) return;

    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }

    if (!turnO && gameMode === 'ai' && !isWinner) {
      setTimeout(aiMove, 500); // AI makes a move after a delay
    }
  });
});

const aiMove = () => {
  let availableBoxes = [];
  boxes.forEach((box, index) => {
    if (!box.innerText) {
      availableBoxes.push(index);
    }
  });

  if (availableBoxes.length === 0) return;

  let randomIndex = availableBoxes[Math.floor(Math.random() * availableBoxes.length)];
  boxes[randomIndex].innerText = "X";
  boxes[randomIndex].disabled = true;
  turnO = true;
  count++;

  let isWinner = checkWinner();

  if (count === 9 && !isWinner) {
    gameDraw();
  }
};

const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations ${winner}, You are the Winner!`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }
  return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
