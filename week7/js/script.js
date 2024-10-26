const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//////////////////////////////////////////////////////
// making the character
const character = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0
};

// making the enemies
const enemies = [
    { x: 100, y: 100, width: 50, height: 50, speed: character.speed * 0.4 },
    { x: 1500, y: 1000, width: 50, height: 50, speed: character.speed * 0.4 }
];

// making the collectibles
const collectibles = [];

// Initialize score
let score = 0;

function drawCharacter() {
    ctx.fillStyle = 'red';
    ctx.fillRect(character.x, character.y, character.width, character.height);
}

function drawEnemies() {
    ctx.fillStyle = 'blue';
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

function drawCollectibles() {
    ctx.fillStyle = 'green';
    collectibles.forEach(collectible => {
        ctx.fillRect(collectible.x, collectible.y, collectible.width, collectible.height);
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    clearCanvas();
    drawCharacter();
    drawEnemies();
    drawCollectibles();

    // Update character position
    character.x += character.dx;
    character.y += character.dy;

    // Collision detection with canvas borders
    if (character.x < 0) {
        character.x = 0;
    }
    if (character.x + character.width > canvas.width) {
        character.x = canvas.width - character.width;
    }
    if (character.y < 0) {
        character.y = 0;
    }
    if (character.y + character.height > canvas.height) {
        character.y = canvas.height - character.height;
    }

    // Update enemies position
    enemies.forEach(enemy => {
        const angle = Math.atan2(character.y - enemy.y, character.x - enemy.x);
        enemy.x += enemy.speed * Math.cos(angle);
        enemy.y += enemy.speed * Math.sin(angle);

        // Check for collision with character
        if (isColliding(character, enemy)) {
            gameOver();
        }
    });

    // Check for collision with collectibles
    collectibles.forEach((collectible, index) => {
        if (isColliding(character, collectible)) {
            collectibles.splice(index, 1); // Remove collectible
            score += 1; // Increase score
            if (enemies.length > 0) {
                enemies.pop(); // Remove one enemy
            }
        }
    });

    requestAnimationFrame(update);
}

function isColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function gameOver() {
    alert(`YOU LOSE! Your score: ${score}. Press OK to restart.`);
    document.location.reload();
}

function keyDown(e) {
    if (e.key === 'd' || e.key === 'D') {
        character.dx = character.speed;
    } else if (e.key === 'a' || e.key === 'A') {
        character.dx = -character.speed;
    } else if (e.key === 'w' || e.key === 'W') {
        character.dy = -character.speed;
    } else if (e.key === 's' || e.key === 'S') {
        character.dy = character.speed;
    }
}

function keyUp(e) {
    if (
        e.key === 'd' || e.key === 'D' ||
        e.key === 'a' || e.key === 'A' ||
        e.key === 'w' || e.key === 'W' ||
        e.key === 's' || e.key === 'S'
    ) {
        character.dx = 0;
        character.dy = 0;
    }
}

function spawnCollectible() {
    const collectible = {
        x: Math.random() * (canvas.width - 50),
        y: Math.random() * (canvas.height - 50),
        width: 30,
        height: 30
    };
    collectibles.push(collectible);
}

function spawnEnemy() {
    const enemy = {
        x: Math.random() * (canvas.width - 50),
        y: Math.random() * (canvas.height - 50),
        width: 50,
        height: 50,
        speed: character.speed * 0.4
    };
    enemies.push(enemy);
}

// Spawn a collectible every 5 seconds
setInterval(spawnCollectible, 5000);

// Spawn an enemy every 5 seconds
setInterval(spawnEnemy, 5000);

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update();