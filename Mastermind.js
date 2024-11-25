let secretCode = generateSecretCode(4); 
let attempts = []; 
let timer; 
let timeLeft = 60; 
let gameStarted = false; 
let currentDifficulty = 4; 
let maxAttempts = 10; 
let remainingAttempts = maxAttempts; 

document.getElementById('submit').addEventListener('click', function() {
    const guess = document.getElementById('guess').value.trim(); 
    const guessArray = guess.split(''); 

    // Validação do comprimento do palpite
    if (guessArray.length < 4 || guessArray.length > 10) {
        alert(`Insira entre 4 e 10 números. Você inseriu ${guessArray.length} número(s).`);
        return; 
    }

    if (!gameStarted) {
        startTimer(); 
        gameStarted = true;
    }

    decreaseAttempts(); 
    attempts.push(guess); 
    updateAttemptsDisplay(); 

    displayResult(guessArray); 
});

function displayResult(guessArray) {
    const resultContainer = document.getElementById('result-container');
    const resultsElement = document.getElementById('results');
    resultContainer.style.display = 'block'; 

    let resultHTML = ''; 
    let correctCount = 0; 
    let wrongPositionCount = 0; 

    const secretArray = secretCode.split(''); 

    // Contar acertos e posições erradas
    guessArray.forEach((num, index) => {
        if (num === secretArray[index]) { 
            resultHTML += `<span class="correct">${num}</span> `; 
            correctCount++; 
        } else if (secretArray.includes(num)) {
            resultHTML += `<span class="wrong">${num}</span> `; 
            wrongPositionCount++; 
        } else {
            resultHTML += `<span class="wrong">${num}</span> `; 
        }
    });

    resultsElement.innerHTML += `<div>${resultHTML}</div>`; 

    // Mensagem de acertos
    if (correctCount === currentDifficulty) {
        alert('Parabéns! Você acertou todos os números!');
        resetGame(); 
    } else {
        alert(`Você acertou ${correctCount} número(s) na posição correta e ${wrongPositionCount} número(s) na posição errada.`);
    }
}

function updateAttemptsDisplay() {
    const attemptsContainer = document.getElementById('attempts');
    attemptsContainer.innerHTML = ''; // Limpa os resultados anteriores

    attempts.forEach(attempt => {
        const attemptDiv = document.createElement('div');
        attemptDiv.textContent = attempt; 
        attemptsContainer.appendChild(attemptDiv); 
    });
}

function generateSecretCode(length) {
    const numbers = [];
    for (let i = 0; i < length; i++) {
        numbers.push(Math.floor(Math.random() * 10)); 
    }
    return numbers.join(''); 
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = formatTime(timeLeft); // Atualiza o cronômetro

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Tempo esgotado! O jogo será resetado.');
            resetGame(); // Reseta o jogo se o tempo acabar
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`; // Formato MM:SS
}

function decreaseAttempts() {
    if (remainingAttempts > 0) {
        remainingAttempts--;
        document.getElementById('remaining-attempts').textContent = remainingAttempts; // Atualiza o contador de tentativas
    }
    if (remainingAttempts === 0) {
        alert('Você não tem mais tentativas!');
        resetGame(); // Reseta o jogo se as tentativas acabarem
    }
}

document.getElementById('reset').addEventListener('click', resetGame);

function resetGame() {
    secretCode = generateSecretCode(4); 
    attempts = []; 
    remainingAttempts = maxAttempts; 
    timeLeft = 60; 
    clearInterval(timer); 
    document.getElementById('timer').textContent = formatTime(timeLeft); 
    document.getElementById('guess').value = ''; 
    document.getElementById('result-container').style.display = 'none'; 
    updateAttemptsDisplay(); 
    document.getElementById('remaining-attempts').textContent = remainingAttempts; 
}
