const gameBoard = document.getElementById('game-board');
const winnerMessage = document.getElementById('winner-message');
const winnerGif = document.getElementById('winner-gif');
const player2Container = document.getElementById('player2-container');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isHumanVsHuman = true;
let gameOver = false; // Flag para saber se o jogo terminou

// Handle Mode Selection
document.getElementById('human-vs-human').addEventListener('click', () => {
    isHumanVsHuman = true;
    player2Container.style.display = 'block';
    document.getElementById('human-vs-human').classList.add('clicked');
    document.getElementById('robot-vs-human').classList.remove('clicked');
    resetGame(); // Reseta o jogo ao trocar de modo
});

document.getElementById('robot-vs-human').addEventListener('click', () => {
    isHumanVsHuman = false;
    player2Container.style.display = 'none';
    document.getElementById('robot-vs-human').classList.add('clicked');
    document.getElementById('human-vs-human').classList.remove('clicked');
    resetGame(); // Reseta o jogo ao trocar de modo
});

// Initialize game board
function initBoard() {
    gameBoard.innerHTML = '';
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false; // Reseta o estado de game over
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => makeMove(i));
        gameBoard.appendChild(cell);
    }
}

// Make a move
function makeMove(index) {
    if (board[index] !== '' || gameOver) return; // Impede de jogar em uma célula já preenchida ou se o jogo acabou

    board[index] = currentPlayer;
    renderBoard();
    checkWinner();

    if (!gameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        
        if (!isHumanVsHuman && currentPlayer === 'O') {
            // Delay para o robô jogar
            setTimeout(robotMove, 500);
        }
    }
}

// Render the board
function renderBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

// Check if there is a winner
function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
        [0, 4, 8], [2, 4, 6]              // Diagonal
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            announceWinner(currentPlayer);
            gameOver = true;
            return;
        }
    }

    // Caso de empate (velha) - se todas as células estão preenchidas e não há vencedor
    if (!board.includes('')) {
        announceWinner('Empate');
        gameOver = true;
    }
}

// Announce the winner
function announceWinner(winner) {
    const player1Name = document.getElementById('player1').value || 'Jogador 1';
    const player2Name = document.getElementById('player2').value || 'Jogador 2';
    
    if (winner === 'Empate') {
        winnerMessage.textContent = ' Empate, você fez o minimo.';
        winnerGif.innerHTML = `<img src="https://i.pinimg.com/originals/f3/17/7d/f3177dbc10c5071294134a7c9677871e.gif" alt="Empate GIF">`;
    } 
    else if (!isHumanVsHuman && winner === 'O') {
        winnerMessage.textContent = 'Parabéns, você perdeu para um robô, menos cem mil pontos pra você!';
        winnerGif.innerHTML = `<img src="https://i.pinimg.com/originals/a0/6b/62/a06b62b080c16b9d0336a64f45a18c21.gif" alt="Loser GIF">`;
    } 
    else {
        const winnerName = winner === 'X' ? player1Name : player2Name;
        winnerMessage.textContent = `Parabéns, ${winnerName} venceu!`;
        winnerGif.innerHTML = `<img src="https://i.pinimg.com/originals/41/50/c4/4150c41c5513f614eb658e55a5b8a67a.gif" alt="Winner GIF">`;
    }
}

// Robot makes a move
function robotMove() {
    if (gameOver) return; // Robô não joga se o jogo acabou

    const availableMoves = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    makeMove(randomMove); // O robô faz sua jogada

    checkWinner(); // Verifica se há vencedor após a jogada do robô
    if (!gameOver) {
        currentPlayer = 'X'; // Volta a vez para o humano
    }
}

// Reset Game
function resetGame() {
    initBoard();
    winnerMessage.textContent = ''; // Reseta a mensagem de vencedor
    winnerGif.innerHTML = ''; // Remove o gif de vencedor
}

// Inicializa o jogo ao carregar a página
window.onload = initBoard;

// Reseta o jogo ao clicar em "Resetar"
document.getElementById('reset-game').addEventListener('click', resetGame);

// Voltar para página jogo.html
document.getElementById('go-back').addEventListener('click', () => {
    window.location.href = 'jogo.html';
});
