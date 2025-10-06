// Get the game container and puzzle board elements
const puzzleBoard = document.getElementById('puzzle-board');
const puzzleImage = document.getElementById('logo'); // Zama logo

// Define the number of rows and columns for the puzzle (3x3 grid)
const rows = 3;
const cols = 3;
const puzzlePieces = [];
let completedPieces = 0;

// Create the puzzle pieces
function createPuzzlePieces() {
    const imageWidth = puzzleImage.width;
    const imageHeight = puzzleImage.height;
    const pieceWidth = imageWidth / cols;
    const pieceHeight = imageHeight / rows;

    // Split the image into pieces and create draggable pieces
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');

            // Set the background position for each piece (cut from the original image)
            piece.style.backgroundImage = `url('${puzzleImage.src}')`;
            piece.style.backgroundPosition = `-${col * pieceWidth}px -${row * pieceHeight}px`;
            piece.style.backgroundSize = `${imageWidth}px ${imageHeight}px`;

            // Set up the draggable feature
            piece.setAttribute('draggable', true);
            piece.setAttribute('data-id', `${row}-${col}`);
            
            // Add event listeners for dragging
            piece.addEventListener('dragstart', handleDragStart);
            piece.addEventListener('dragover', handleDragOver);
            piece.addEventListener('drop', handleDrop);
            
            puzzleBoard.appendChild(piece);
            puzzlePieces.push(piece);
        }
    }
}

// Handle dragstart event (set the data to be transferred)
function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.getAttribute('data-id'));
}

// Handle dragover event (allow the drop)
function handleDragOver(e) {
    e.preventDefault();  // Necessary to allow dropping
}

// Handle drop event (place the dragged piece in the right position)
function handleDrop(e) {
    e.preventDefault();
    const droppedPieceId = e.dataTransfer.getData('text/plain');
    const targetPiece = e.target;

    if (targetPiece && targetPiece.classList.contains('puzzle-piece')) {
        const draggedPiece = document.querySelector(`[data-id="${droppedPieceId}"]`);

        // Swap the positions of the pieces
        const targetPieceId = targetPiece.getAttribute('data-id');
        targetPiece.setAttribute('data-id', droppedPieceId);
        draggedPiece.setAttribute('data-id', targetPieceId);

        // Move the pieces in the grid
        const tempStyle = targetPiece.style.backgroundPosition;
        targetPiece.style.backgroundPosition = draggedPiece.style.backgroundPosition;
        draggedPiece.style.backgroundPosition = tempStyle;

        // Check if the puzzle is solved
        checkPuzzleCompletion();
    }
}

// Check if the puzzle is correctly assembled
function checkPuzzleCompletion() {
    completedPieces = 0;

    puzzlePieces.forEach(piece => {
        const correctId = piece.getAttribute('data-id');
        const pieceRow = parseInt(correctId.split('-')[0]);
        const pieceCol = parseInt(correctId.split('-')[1]);
        const expectedPosition = `-${pieceCol * (puzzleImage.width / cols)}px -${pieceRow * (puzzleImage.height / rows)}px`;

        if (piece.style.backgroundPosition === expectedPosition) {
            completedPieces++;
        }
    });

    // If all pieces are correctly placed, the puzzle is solved
    if (completedPieces === puzzlePieces.length) {
        alert('Congratulations! You solved the puzzle!');
    }
}

// Initialize the puzzle game
createPuzzlePieces();
