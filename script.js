const board = document.getElementById("puzzle-board");
const logoImg = document.getElementById("logo");
const moveCounter = document.getElementById("move-counter"); // NEW
let moves = 0; // NEW

const rows = 3, cols = 3;
const pieces = [];

logoImg.onload = () => {
  buildPuzzle();
  shufflePieces();
  updateMoves(0); // Initialize counter
};

function buildPuzzle() {
  const w = logoImg.naturalWidth;
  const h = logoImg.naturalHeight;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const piece = document.createElement("div");
      piece.className = "puzzle-piece";
      piece.style.backgroundImage = `url('${logoImg.src}')`;
      piece.style.backgroundPosition = `-${c * (w/cols)}px -${r * (h/rows)}px`;
      piece.style.backgroundSize = `${w}px ${h}px`;
      piece.dataset.correct = `${r}-${c}`;
      board.appendChild(piece);
      pieces.push(piece);
    }
  }

  pieces.forEach(p => p.addEventListener("pointerdown", onPick));
}

let picked = null;

function onPick() {
  if (picked === this) {
    picked.classList.remove("highlight");
    picked = null;
    return;
  }
  if (!picked) {
    picked = this;
    picked.classList.add("highlight");
  } else {
    swapPieces(picked, this);
    picked.classList.remove("highlight");
    picked = null;
    moves++;                     // INCREMENT move count
    updateMoves(moves);          // UPDATE the UI
    checkWin();
  }
}

function swapPieces(a, b) {
  const tmpBg = a.style.backgroundPosition;
  a.style.backgroundPosition = b.style.backgroundPosition;
  b.style.backgroundPosition = tmpBg;

  const tmpCorrect = a.dataset.correct;
  a.dataset.correct = b.dataset.correct;
  b.dataset.correct = tmpCorrect;
}

function shufflePieces() {
  for (let i = pieces.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    swapPieces(pieces[i], pieces[j]);
  }
  moves = 0;
  updateMoves(moves);
}

function checkWin() {
  let ok = true;
  pieces.forEach(p => {
    const [r, c] = p.dataset.correct.split("-");
    const expected = `-${c * (logoImg.naturalWidth / cols)}px -${r * (logoImg.naturalHeight / rows)}px`;
    if (p.style.backgroundPosition !== expected) ok = false;
  });
  if (ok) {
    setTimeout(() => alert(`🎉 Puzzle solved in ${moves} moves!`), 200);
  }
}

// NEW: updateMoves helper
function updateMoves(count) {
  moveCounter.textContent = `Moves: ${count}`;
}

