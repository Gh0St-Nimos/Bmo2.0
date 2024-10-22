const words = ["javascript", "programacao", "desenvolvimento", "computador", "internet"];
let selectedWord = "";
let guessedLetters = [];
let attempts = 6;

const forcaCanvas = document.getElementById("forcaCanvas");
const ctx = forcaCanvas.getContext("2d");
const wordDisplay = document.getElementById("wordDisplay");
const letterInput = document.getElementById("letterInput");
const guessButton = document.getElementById("guessButton");
const resetButton = document.getElementById("resetButton");
const message = document.getElementById("message");
const goBackButton = document.getElementById("go-back");

// Iniciar o jogo
function startGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    attempts = 6;
    drawHangman();
    displayWord();
    message.textContent = "";
}

// Mostrar a palavra com letras adivinhadas
function displayWord() {
    wordDisplay.textContent = selectedWord.split("").map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
}

// Adicionar uma letra à tentativa
function guessLetter() {
    const letter = letterInput.value.toLowerCase();
    letterInput.value = "";
    
    if (letter && !guessedLetters.includes(letter) && attempts > 0) {
        guessedLetters.push(letter);
        if (!selectedWord.includes(letter)) {
            attempts--;
            drawHangman();
        }
        displayWord();
        checkGameOver();
    }
}

// Verifica se o jogo acabou
function checkGameOver() {
    if (attempts === 0) {
        message.textContent = "Você perdeu! A palavra era: " + selectedWord;
    } else if (selectedWord.split("").every(letter => guessedLetters.includes(letter))) {
        message.textContent = "Você ganhou!";
    }
}

// Desenhar a forca
function drawHangman() {
    ctx.clearRect(0, 0, forcaCanvas.width, forcaCanvas.height);
    
    // Desenho da forca
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(150, 150);
    ctx.moveTo(100, 150);
    ctx.lineTo(100, 50);
    ctx.lineTo(150, 50);
    ctx.lineTo(150, 70);
    ctx.stroke();

    // Desenhos da cabeça, corpo, braços e pernas
    if (attempts < 6) {
        ctx.beginPath();
        ctx.arc(150, 80, 10, 0, Math.PI * 2); // Cabeça
        ctx.stroke();
    }
    if (attempts < 5) {
        ctx.beginPath();
        ctx.moveTo(150, 90);
        ctx.lineTo(150, 120); // Corpo
        ctx.stroke();
    }
    if (attempts < 4) {
        ctx.beginPath();
        ctx.moveTo(150, 100);
        ctx.lineTo(130, 110); // Braço esquerdo
        ctx.moveTo(150, 100);
        ctx.lineTo(170, 110); // Braço direito
        ctx.stroke();
    }
    if (attempts < 3) {
        ctx.beginPath();
        ctx.moveTo(150, 120);
        ctx.lineTo(130, 140); // Perna esquerda
        ctx.moveTo(150, 120);
        ctx.lineTo(170, 140); // Perna direita
        ctx.stroke();
    }
}

// Reiniciar o jogo
resetButton.addEventListener("click", startGame);
guessButton.addEventListener("click", guessLetter);
goBackButton.addEventListener("click", () => {
    window.location.href = 'jogo.html';
});

// Iniciar o jogo na carga da página
startGame();
