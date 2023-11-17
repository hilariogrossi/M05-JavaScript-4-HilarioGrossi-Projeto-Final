document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const currentPlayerDisplay = document.getElementById('current-player');
    const gameStatusDisplay = document.getElementById('game-status');
    const resetButton = document.getElementById('reset-button');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', 
                     '', '', '',
                     '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]

        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;

            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {

                return gameBoard[a];

            }

        }

        return null;
    };

    const checkDraw = () => {
        return gameBoard.every(cell => cell !== '');

    };

    const endGame = (result) => {
        gameActive = false;
        gameStatusDisplay.textContent = result ? `Jogador ${result} venceu!` : 'Empate!';

    };

    const handleCellClick = (index) => {
        if (gameBoard[index] || !gameActive) return;

        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        const winner = checkWinner();

        if (winner) {
            endGame(winner);

        } else if (checkDraw()) {
            endGame(null);

        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerDisplay.textContent = currentPlayer;

        }

    };

    const resetGame = () => {
        gameBoard = ['', '', '', 
                     '', '', '',
                     '', '', ''];
        gameActive = true;
        currentPlayer = 'X';

        gameStatusDisplay.textContent = '';
        currentPlayerDisplay.textContent = currentPlayer;

        cells.forEach((cell, index) => {
            cell.textContent = '';
            cell.addEventListener('click', () => handleCellClick(index));

        });

    };

    resetButton.addEventListener('click', resetGame);

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));

    });
    
});
