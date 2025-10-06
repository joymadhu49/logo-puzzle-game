const board = document.getElementById('puzzle-board');
const size = 3; // 3x3 grid
let pieces = []; // Array to store pieces
let emptyPos = { row: 2, col: 2 }; // Start with bottom-right empty

// Initialize pieces
function initPuzzle() {
    pieces = [];
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (row === size-1 && col === size-1) continue; // empty space
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.style.backgroundImage = "url('assets/zama_logo.png')";
            piece.style.backgroundPosition = `-${col*100}px -${row*100}px`;
            piece.dataset.row = row;
            piece.dataset.col = col;
            board.appendChild(piece);
            pieces.push(piece);
        }
    }
}

// Swap piece with empty space
function movePiece(direction) {
    let targetRow = emptyPos.row;
    let targetCol = emptyPos.col;

    if(direction === 'up') targetRow += 1;
    if(direction === 'down') targetRow -= 1;
    if(direction === 'left') targetCol += 1;
    if(direction === 'right') targetCol -= 1;

    const piece = pieces.find(p => parseInt(p.dataset.row) === targetRow && parseInt(p.dataset.col) === targetCol);
    if(piece){
        // Swap positions
        piece.dataset.row = emptyPos.row;
        piece.dataset.col = emptyPos.col;
        piece.style.backgroundPosition = `-${piece.dataset.col*100}px -${piece.dataset.row*100}px`;
        emptyPos.row = targetRow;
        emptyPos.col = targetCol;

        checkCompletion();
    }
}

// Check if puzzle solved
function checkCompletion(){
    let solved = pieces.every(p => {
        return parseInt(p.dataset.row) === parseInt(p.dataset.row) &&
               parseInt(p.dataset.col) === parseInt(p.dataset.col);
    });
    if(solved){
        alert("Congratulations! You solved the puzzle!");
    }
}

// Button controls
document.getElementById('up').addEventListener('click', ()=>movePiece('up'));
document.getElementById('down').addEventListener('click', ()=>movePiece('down'));
document.getElementById('left').addEventListener('click', ()=>movePiece('left'));
document.getElementById('right').addEventListener('click', ()=>movePiece('right'));

initPuzzle();
}


