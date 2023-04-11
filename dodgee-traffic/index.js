var gamehastearted = false;
var score = 0;
var canvas = document.getElementById("canvas");
var screen = {
  w: 700,
  h: 500
};

var enemySpeed = 500;

var scale = window.innerWidth / screen.w;

// ------------------------- canvas screen ----------------- //
function setCanvasSize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  scale = canvas.width / screen.w;
}

window.addEventListener("resize", () => {
  location.reload();
});
window.addEventListener("load", setCanvasSize);

// ------------------------- clear screen ----------------- //
const context = canvas.getContext("2d");
function clear() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
}

// ------------------------- collision detection ----------------- //
function isColliding(a, b) {
  if (
    !(
      a.y + a.h < b.y ||
      a.y > b.y + b.height ||
      a.x + a.w < b.x ||
      a.x > b.x + b.width
    )
  ) {
    gamehastearted = false;
    score = 0;
    player.v = 0;
    // allenemies.length = 0;
  }
}

// ---------------------- drawing player --------------------- //
let player = {
  x: window.innerWidth / 2 - 50 * scale,
  y: window.innerHeight - 170 * scale,
  w: 100 * scale,
  v: 0,
  h: 150 * scale,
  sprite: document.getElementById("player"),
  a: 5
};

function drawPlayer() {
  var ors = context.fillStyle;
  context.fillStyle = "red";
  if (
    player.x + player.v >= 0 &&
    player.x + player.v <= window.innerWidth - player.w
  ) {
    player.x += player.v;
  }
  // context.fillRect(player['x'], player['y'], player['w'], player['h']);
  // context.fill();
  context.drawImage(
    player.sprite,
    player["x"] - 10,
    player["y"] - 10,
    player["w"] + 20,
    player["h"] + 20
  );
  context.fillStyle = ors;
}

// ---------------------- keybord --------------------- //
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function moveright() {
  player.v = player.a;
}
function moveleft() {
  player.v = -player.a;
}
function speedup() {
  if (enemySpeed < 1000) {
    enemySpeed += 20;
  }
  if (player.a < 10) {
    player.a += 3;
  }
}

function slowdown() {
  if (enemySpeed > 500) {
    enemySpeed -= 20;
  }
  if (player.a > 5) {
    player.a -= 1.5;
  }
}

function keydown(e) {
  if (!gamehastearted) return;
  if (e.key === "d" || e.key === "ArrowRight") {
    moveright();
  } else if (e.key === "a" || e.key === "ArrowLeft") {
    moveleft();
  } else if (e.key === "w" || e.key === "ArrowUp") {
    speedup();
  } else if (e.key === "s" || e.key === "ArrowDown") {
    slowdown();
  } else {
    return;
  }
}
function keyup(e) {
  if (
    e.key === "ArrowDown" ||
    e.key === "d" ||
    e.key === "ArrowRight" ||
    e.key === "a" ||
    e.key === "ArrowLeft"
  ) {
    player.v = 0;
  }
}

// ------------------------- enemy ----------------- //
let lastUpdateTime = 0;
class Enemy {
  constructor() {
    this.width = 100 * scale;
    this.height = 150 * scale;
    this.sprite = document.getElementById("player");

    this.x = (window.innerWidth / 4) * Math.floor(Math.random() * 4);
    this.x += this.width / 2;
    this.min = window.innerHeight + 200;
    this.max = window.innerHeight + 500;
    this.y = Math.ceil(Math.random() * this.min + this.max);
    this.y *= -1;

    while (this.checkOverlap()) {
      this.y -= 100 * scale;
    }
  }
  draw() {
    // context.fillRect(this.x, this.y, this.width, this.height);
    context.fill();
    context.drawImage(
      this.sprite,
      this.x - 10,
      this.y - 10,
      this.width + 20,
      this.height + 20
    );
  }
  update(v) {
    this.y += v;
    isColliding(player, this);

    while (this.checkOverlap()) {
      this.y -= 100 * scale;
    }
    if (this.y >= window.innerHeight + 100) {
      this.x = (window.innerWidth / 4) * Math.floor(Math.random() * 4);
      this.x += this.width / 2;
      allenemies = allenemies.filter((e) => e !== this);
      score++;
    }
  }
  checkOverlap() {
    return allenemies.some((e) => {
      if (e === this) {
        return false;
      }
      return !(
        this.x + this.width < e.x ||
        this.x > e.x + e.width ||
        this.y + this.height < e.y ||
        this.y > e.y + e.height
      );
    });
  }
}
var allenemies = [];
function createEnemies() {
  if (allenemies.length < 3) {
    allenemies.push(new Enemy());
  }
}

// ------------------------- lane lines ----------------- //
function drawlanelines() {
  for (let i = 1; i < 4; i++) {
    context.fillRect((screen.w / 4) * scale * i, 0, 10 * scale, canvas.height);
  }
}

// ------------------------- score ----------------- //
function drawscore() {
  context.font = "48px Arial";
  context.fillText(score, 100 * scale, 50 * scale, 100 * scale);
}

function drawspeed() {
  context.font = "48px Arial";
  context.fillText(
    enemySpeed,
    window.innerWidth - 100 * scale,
    window.innerHeight - 100 * scale,
    100 * scale
  );
}

// ------------------------- start button ----------------- //
var start = document.getElementById("start");
function drawButton() {
  context.drawImage(
    start,
    window.innerWidth / 2 - 50 * scale,
    30 * scale,
    100 * scale,
    100 * scale
  );

  // context.fillRect(window.innerWidth/2-30*scale, 60*scale, 60*scale, 60*scale);
}

// ------------------------- update ----------------- //
function update(currentTime) {
  const deltaTime = (currentTime - lastUpdateTime) / 1000;
  lastUpdateTime = currentTime;
  clear();
  drawlanelines();
  drawPlayer();

  if (gamehastearted) {
    createEnemies();
    allenemies.forEach((e) => {
      e.draw();
      e.update(deltaTime * enemySpeed);
    });
    drawscore();
    drawspeed();
  } else {
    allenemies.forEach((e) => {
      e.draw();
    });
    drawButton();
  }
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

canvas.addEventListener("click", () => {
  if (!gamehastearted) {
    gamehastearted = true;
    player.x = window.innerWidth / 2 - 50 * scale;
    player.y = window.innerHeight - 170 * scale;
    allenemies.length = 0;
    enemySpeed = 500;
  }
});
