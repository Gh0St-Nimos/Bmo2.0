let secretCode = generateSecretCode(4); // Gera o código secreto com 4 dígitos
let attempts = []; // Array para armazenar os palpites
let timer; // Variável para o cronômetro
let timeLeft = 60; // Duração do cronômetro em segundos
let gameStarted = false; // Controle para iniciar o cronômetro apenas no primeiro envio
let currentDifficulty = 4; // Dificuldade atual
let maxAttempts = 10; // Número máximo de tentativas
let remainingAttempts = maxAttempts; // Tentativas restantes

document.getElementById('submit').addEventListener('click', function() {
    const guess = document.getElementById('guess').value.trim(); // Remove espaços em branco
    const guessArray = guess.split(''); // Divide o palpite em uma array sem espaços

    // Validação do comprimento do palpite
    if (guessArray.length < 4 || guessArray.length > 10) {
        alert(`Insira entre 4 e 10 números. Você inseriu ${guessArray.length} número(s).`);
        return; // Encerra a função se a validação falhar
    }

    if (!gameStarted) {
        startTimer(); // Inicia o cronômetro ao primeiro palpite
        gameStarted = true;
    }

    decreaseAttempts(); // Reduz tentativas após cada envio
    attempts.push(guess); // Adiciona o palpite ao array
    updateAttemptsDisplay(); // Exibe o palpite

    displayResult(guessArray); // Exibe o resultado do palpite
});

function displayResult(guessArray) {
    const resultContainer = document.getElementById('result-container');
    const resultsElement = document.getElementById('results');
    resultContainer.style.display = 'block'; // Exibe o container

    let resultHTML = ''; // Variável para armazenar o HTML dos resultados
    let correctCount = 0; // Contador de acertos
    let wrongPositionCount = 0; // Contador de números corretos na posição errada

    const secretArray = secretCode.split(''); // Divide o código secreto em uma array

    // Contar acertos e posições erradas
    guessArray.forEach((num, index) => {
        if (num === secretArray[index]) { // Compara com o código secreto
            resultHTML += `<span class="correct">${num}</span> `; // Número correto
            correctCount++; // Incrementa o contador de acertos
        } else if (secretArray.includes(num)) {
            resultHTML += `<span class="wrong">${num}</span> `; // Número correto, mas na posição errada
            wrongPositionCount++; // Incrementa o contador de posições erradas
        } else {
            resultHTML += `<span class="wrong">${num}</span> `; // Número errado
        }
    });

    resultsElement.innerHTML += `<div>${resultHTML}</div>`; // Adiciona o resultado ao container

    // Mensagem de acertos
    if (correctCount === currentDifficulty) {
        alert('Parabéns! Você acertou todos os números!');
        resetGame(); // Reseta o jogo ao acertar
    } else {
        alert(`Você acertou ${correctCount} número(s) na posição correta e ${wrongPositionCount} número(s) na posição errada.`);
    }
}

function updateAttemptsDisplay() {
    const attemptsContainer = document.getElementById('attempts');
    attemptsContainer.innerHTML = ''; // Limpa os resultados anteriores

    attempts.forEach(attempt => {
        const attemptDiv = document.createElement('div');
        attemptDiv.textContent = attempt; // Mostra o palpite do usuário
        attemptsContainer.appendChild(attemptDiv); // Adiciona o palpite ao container
    });
}

function generateSecretCode(length) {
    const numbers = [];
    for (let i = 0; i < length; i++) {
        numbers.push(Math.floor(Math.random() * 10)); // Gera números entre 0 e 9
    }
    return numbers.join(''); // Retorna o código secreto como uma string
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
    secretCode = generateSecretCode(4); // Gera um novo código secreto
    attempts = []; // Reseta os palpites
    remainingAttempts = maxAttempts; // Reseta tentativas para 10
    timeLeft = 60; // Reseta o tempo
    clearInterval(timer); // Para o cronômetro
    document.getElementById('timer').textContent = formatTime(timeLeft); // Reseta o cronômetro
    document.getElementById('guess').value = ''; // Limpa o input
    document.getElementById('result-container').style.display = 'none'; // Esconde o container de resultados
    updateAttemptsDisplay(); // Atualiza a exibição de tentativas
    document.getElementById('remaining-attempts').textContent = remainingAttempts; // Atualiza o contador de tentativas
}
