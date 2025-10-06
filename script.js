function initPuzzle() {
    board.innerHTML = '';
    pieces = [];

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const piece = document.createElement('div');
            piece.classList.add('piece');
            piece.dataset.row = row;
            piece.dataset.col = col;
            piece.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
            board.appendChild(piece);
            pieces.push(piece);
        }
    }

    // Hide bottom-right piece AFTER creating all 9
    const emptyPiece = pieces.find(
        p => p.dataset.row == size - 1 && p.dataset.col == size - 1
    );
    emptyPiece.style.backgroundImage = 'none';
    emptyPiece.style.border = '1px solid red'; // optional, helps you see it
    emptyPos = { row: size - 1, col: size - 1 };

    shufflePuzzle();
}
