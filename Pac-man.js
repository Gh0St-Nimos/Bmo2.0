const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const pacmanRadius = 10;
let pacmanX = 30;
let pacmanY = 30;
let score = 0;
let gameInterval;
let direction = { x: 0, y: 0 };

const walls = [
    { x: 0, y: 0, width: 10, height: canvas.height },
    { x: 0, y: 0, width: canvas.width, height: 10 },
    { x: canvas.width - 10, y: 0, width: 10, height: canvas.height },
    { x: 0, y: canvas.height - 10, width: canvas.width, height: 10 },
    // Middle part (Google Doodle inspired)
    { x: 80, y: 60, width: 440, height: 10 },
    { x: 80, y: 120, width: 440, height: 10 },
    { x: 80, y: 180, width: 440, height: 10 },
    { x: 80, y: 240, width: 440, height: 10 },
    { x: 80, y: 300, width: 440, height: 10 },
];

const ghosts = [
    { x: 100, y: 60, size: 20, color: 'red', direction: { x: 1, y: 0 } },
    { x: 200, y: 60, size: 20, color: 'pink', direction: { x: -1, y: 0 } },
    { x: 150, y: 150, size: 20, color: 'cyan', direction: { x: 0, y: 1 } },
    { x: 250, y: 200, size: 20, color: 'orange', direction: { x: 0, y: -1 } },
];

const pellets = [];
for (let x = 20; x < canvas.width - 20; x += 20) {
    for (let y = 20; y < canvas.height - 20; y += 20) {
        pellets.push({ x: x, y: y });
    }
}

function drawPacman() {
    ctx.fillStyle = "#ffcc00";
    ctx.beginPath();
    ctx.arc(pacmanX, pacmanY, pacmanRadius, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacmanX, pacmanY);
    ctx.fill();
}

function drawWalls() {
    ctx.fillStyle = "#0000ff";
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

function drawGhosts() {
    ghosts.forEach(ghost => {
        ctx.fillStyle = ghost.color;
        ctx.beginPath();
        ctx.arc(ghost.x + ghost.size / 2, ghost.y + ghost.size / 2, ghost.size / 2, 0, Math.PI * 2);
        ctx.fill();
    });
}

function drawPellets() {
    ctx.fillStyle = "#ffffff";
    pellets.forEach(pellet => {
        ctx.beginPath();
        ctx.arc(pellet.x, pellet.y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function checkWallCollision(x, y) {
    return walls.some(wall => {
        return (
            x + pacmanRadius > wall.x &&
            x - pacmanRadius < wall.x + wall.width &&
            y + pacmanRadius > wall.y &&
            y - pacmanRadius < wall.y + wall.height
        );
    });
}

function checkPelletCollision() {
    pellets.forEach((pellet, index) => {
        if (Math.abs(pacmanX - pellet.x) < pacmanRadius + 4 && Math.abs(pacmanY - pellet.y) < pacmanRadius + 4) {
            pellets.splice(index, 1);
            score += 10;
        }
    });
}

function update() {
    clearCanvas();
    drawWalls();
    drawPellets();
    drawGhosts();
    drawPacman();

    let newX = pacmanX + direction.x;
    let newY = pacmanY + direction.y;

    if (!checkWallCollision(newX, pacmanY)) pacmanX = newX;
    if (!checkWallCollision(pacmanX, newY)) pacmanY = newY;

    checkPelletCollision();

    ghosts.forEach(ghost => {
        let ghostNewX = ghost.x + ghost.direction.x;
        let ghostNewY = ghost.y + ghost.direction.y;

        if (!checkWallCollision(ghostNewX, ghost.y)) {
            ghost.x = ghostNewX;
        } else {
            ghost.direction.x *= -1;
        }

        if (!checkWallCollision(ghost.x, ghostNewY)) {
            ghost.y = ghostNewY;
        } else {
            ghost.direction.y *= -1;
        }

        if (Math.random() < 0.02) {
            ghost.direction.x = (Math.random() > 0.5 ? 1 : -1) * ghost.direction.x;
            ghost.direction.y = (Math.random() > 0.5 ? 1 : -1) * ghost.direction.y;
        }
    });

    document.getElementById("score").innerText = "Pontuação: " + score;
}

function setDirection(e) {
    switch (e.key) {
        case "ArrowUp":
            direction = { x: 0, y: -2 };
            break;
        case "ArrowDown":
            direction = { x: 0, y: 2 };
            break;
        case "ArrowLeft":
            direction = { x: -2, y: 0 };
            break;
        case "ArrowRight":
            direction = { x: 2, y: 0 };
            break;
    }
}

function startGame() {
    score = 0;
    pacmanX = 30;
    pacmanY = 30;
    clearCanvas();
    document.getElementById("score").innerText = "Pontuação: " + score;
    direction = { x: 0, y: 0 };
    gameInterval = setInterval(update, 100);
}

function resetGame() {
    clearInterval(gameInterval);
    clearCanvas();
    direction = { x: 0, y: 0 };
    score = 0;
    document.getElementById("score").innerText = "Pontuação: " + score;
}

document.getElementById("go-back").addEventListener("click", () => {
    window.location.href = 'jogo.html';
});

document.addEventListener("keydown", setDirection);
document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("reset-game").addEventListener("click", resetGame);
