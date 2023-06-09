'use strict'
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 500;
var game = false;
var endscreen = false;
var gamescreen = true;
var score = 0;


function randomnumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

var player = {
    w: 100,
    h: 100,
    speed: 0,
    y: canvas.height - 110,
    x: 100
}

// bullets
var numberofbullets = 1;
var bullets = []
var canshoot = false;

var bulletsize = {
    w: 15,
    h: 25,
    sprite: loadsprite("images/bullet.png")
}

function createBullet() {
    if(numberofbullets > 0){
        bullets.push({ x: player.x + player.w/2 + bulletsize.w, y: player.y-bulletsize.h, h: bulletsize.h, w: bulletsize.w })
    }
}

function moveBullet() {
    if(bullets.length > 0){
        bullets.forEach(eb => {
            // bound bullets
            if(eb.y < 0 - eb.h){
                bullets.shift()
                game = false;
                endscreen = true;
            }

            // draw bullets
            context.fillStyle = "black";
            context.beginPath();
            // context.fillRect(eb.x, eb.y, eb.w, eb.h);
            context.drawImage(bulletsize.sprite,eb.x, eb.y, eb.w, eb.h);
            context.closePath();
    
            eb.y -= 3;
            obsticles.forEach(eo => {
                if (
                    eo.x < eb.x + eb.w &&
                    eo.x + eo.w > eb.x &&
                    eo.y < eb.y + eb.h &&
                    eo.y + eo.h > eb.y
                ) {
                    obsticles.shift()
                    bullets.shift()
                    numberofbullets++;
                    score++;
                }
            })
        })
    }
}

// obsticles
var obsticles = [];

function createObsticles() {
    obsticles.push({ x: randomnumber(50, canvas.width-100), y: -canvas.height, h: player.h, w: player.w })
}

function moveObsticles() {
    if (obsticles.length == 0) {
        createObsticles()
    } else {
        obsticles.forEach(e => {
            if (e.y > canvas.height + 100) {
                obsticles.shift()
                createObsticles()
            } 
            e.y += randomnumber(5, 7);
        })
    }
}

function collisionDetection() {
    obsticles.forEach(e => {
        if (
            player.x < e.x + e.w &&
            player.x + player.w > e.x &&
            player.y < e.y + e.h &&
            player.y + player.h > e.y
        ) {
            game = false;
            endscreen = true;
        }
    })
}

function drawObsticles() {
    animateobstciles()
}

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawplayer() {
    if(player.x >= 0 && player.x + player.w <= canvas.width){
        player.x += player.speed;
    }
    if(player.x < 0){
        player.x = 0
    }
    if(player.x + player.w > canvas.width){
        player.x = canvas.width - player.w;
    }
    animateplayer()
}

function gameover(){
    context.fillStyle = "black"
    context.font='2rem sans-serif';
    context.beginPath();
    context.fillText("GAME OVER", canvas.width/2 - 80, canvas.height/2 - 50);
    context.closePath();
    context.fillText(score, canvas.width/2, canvas.height/2);
}

function gamestart(){
    context.fillStyle = "black"
    context.font='2rem sans-serif';
    context.beginPath();
    context.fillText("ONE SHOT", canvas.width/2 - 80, canvas.height/2-50);
    context.font='1rem sans-serif';
    context.fillText("CLICK TO START", canvas.width/2 - 70, canvas.height/2);
    context.closePath();
}

function drawscore(){
    context.fillStyle = "black"
    context.font='2rem sans-serif';
    context.beginPath();
    context.fillText(score, canvas.width - 50, 50);
    context.closePath();
}

function update() {
    clear()
    if(endscreen){
        gameover()
    }
    if(gamescreen){
        gamestart()
    }
    moveBullet()
    drawplayer()
    drawObsticles()
    collisionDetection()
    if(game){
        moveObsticles()
        drawscore()
    }
    requestAnimationFrame(update)
}
update();


