// script.js

var debug = false;
canvas.width = 384*2;
canvas.height = (288+40)*2;
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 50;

// clear
function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// collision detection
function collision(a,b){
    if(
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    ){
        return true;
    } else {
        return false;
    }
}

// player one
var playerOne = {
    w: 126,
    h: 126,
    x: 100,
    y: canvas.height*(3/4),
    speed: 0,
    health: 10,
    state: "idle",
    isAnimating: true,
    gravity: true,
    timer: 0,
    coooldown: 300,
    score: 0
}

setInterval(()=>{
    if(playerOne.health < 10){
        playerOne.health++;
    }
}, 10000)

playerOne.areaw= playerOne.w*4+50;
playerOne.areah= playerOne.h+50;
playerOne.areax= playerOne.x-(playerOne.areaw-playerOne.w)/2;
playerOne.areay= playerOne.y-(playerOne.areah-playerOne.h)/2;

playerOne.enemyw= playerOne.w+100;
playerOne.enemyh= playerOne.h+50;
playerOne.enemyx= playerOne.x-(playerOne.enemyw-playerOne.w)/2;
playerOne.enemyy= playerOne.y-(playerOne.enemyh-playerOne.h)/2;

playerOne.drawingw = playerOne.w * (playerOne.w/46);
playerOne.drawingh = playerOne.h * (playerOne.h/46);
playerOne.drawingx = playerOne.x - (playerOne.drawingw-playerOne.w)/2;
playerOne.drawingy = playerOne.y - (playerOne.drawingh-playerOne.h)/2 + 10;

var currentFrameOne = 0, frames__ = 0;
function drawPlayerOne() {
    if(playerOne.state != "strike" && playerOne.x <= canvas.width/4 && (playerOne.x+playerOne.speed) >= 0){
        playerOne.x += playerOne.speed;
        playerOne.areax += playerOne.speed;
        playerOne.drawingx += playerOne.speed;
        playerOne.enemyx += playerOne.speed;
    }

    if(playerOne.state == "strike"){
        camera.speed = 0;
        playerOne.speed = 0;
    }

    

    // hit box
    if(debug){
        context.fillStyle='black';
        context.fillRect(playerOne.areax, playerOne.areay, playerOne.areaw, playerOne.areah);
        context.fillStyle='purple';
        context.fillRect(playerOne.enemyx, playerOne.enemyy, playerOne.enemyw, playerOne.enemyw);
        context.fillStyle='red';
        context.fillRect(playerOne.x, playerOne.y, playerOne.w, playerOne.h);
    }

    // health
    context.fillStyle='red';
    context.fillRect(playerOne.x + 25, playerOne.enemyy, 100, 5);
    context.fillStyle='green';
    context.fillRect(playerOne.x + 25, playerOne.enemyy, playerOne.health*10, 5);

    if(currentFrameOne >= playerOneSprite[playerOne.state].length-1){
        currentFrameOne = 0;
    }
    context.drawImage(playerOneSprite[playerOne.state][currentFrameOne], playerOne.drawingx, playerOne.drawingy, playerOne.drawingw, playerOne.drawingh);
    
    frames__++;
    if (currentFrameOne <= playerOneSprite[playerOne.state].length - 1 && frames__ == 12) {
        currentFrameOne++;
        frames__ = 0;
        if(playerOne.state == "death"){
            console.log("game over!")
            gameisover = true;
        }
    } else if(currentFrameOne == playerOneSprite[playerOne.state].length-1){
        currentFrameOne = 0;
    }

    if (playerOne.gravity && playerOne.y + playerOne.h < canvas.height - 50) {
        playerOne.y += 1;
        playerOne.areay += 1;
        playerOne.drawingy += 1;
    }
}

// enemy
var enemies = [
    
]

function createEnemy(x) {
    enemies.splice(x, 1);
    console.log("number: ", x)
    for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
        enemies.push(
            {
                w: 150,
                h: 150,
                x: canvas.width * ((Math.random() * 4) + 3),
                y: canvas.height * (3 / 4),
                speed: 0,
                health: 1,
                state: "idle",
                gravity: true,
                currentFrame: 0,
                frames__: 0,
                currentTime: new Date().getTime(),
                timerOne: 0,
                coolDown: 2000
            }
        )
    }
    // ((Math.random() * 4) + 3)
}

function drawEnemy() {
    if(enemies.length == 0){
        createEnemy(0);
    }
    
    enemies.forEach((e, i)=>{
        if(e.x>canvas.width/2 && !(collision({
            x: playerOne.enemyx,
            y: playerOne.enemyy,
            w: playerOne.enemyw,
            h: playerOne.enemyh
        },{
            x: e.x - camera.x,
            y: e.y,
            w: e.w,
            h: e.h
        }))){
            e.state = "walk";
            e.x-=2;
        }
        if(e.x <= 0){
            createEnemy();
        }
        if(debug){
            context.fillStyle='red';
            context.fillRect(e.x - camera.x, e.y, e.w, e.h);
        }
        
        if(collision({
            x: playerOne.areax,
            y: playerOne.areay,
            w: playerOne.areaw,
            h: playerOne.areah
        }, {
            x: e.x - camera.x,
            y: e.y,
            w: e.w,
            h: e.h
        }) && !collision({
            x: playerOne.enemyx,
            y: playerOne.enemyy,
            w: playerOne.enemyw,
            h: playerOne.enemyh
        },{
            x: e.x - camera.x,
            y: e.y,
            w: e.w,
            h: e.h
        })){
            e.state = "walk";
            e.x-=1;
        }
        e.strikeCooldown++;
        if(collision({
            x: playerOne.enemyx,
            y: playerOne.enemyy,
            w: playerOne.enemyw,
            h: playerOne.enemyh
        },{
            x: e.x - camera.x,
            y: e.y,
            w: e.w,
            h: e.h
        }) && playerOne.health >= 1 && e.health >= 1 && e.state != "strike"){
            e.state = "strike";
            e.currentFrame = 0;
            e.frames__ = 0;
        } else if(playerOne.health <= 0){
            playerOne.state = "death";
        }

        if(e.state == "strike"){
            e.currentTime = new Date().getTime();
            if (e.currentTime - e.timerOne > e.coolDown){
                e.timerOne = e.currentTime;
                playerOne.health--;
                console.log("playerOne health: ",playerOne.health)
            }
        }
        /*
        playerOne.drawingw = playerOne.w * (playerOne.w/46);
        playerOne.drawingh = playerOne.h * (playerOne.h/46);
        playerOne.drawingx = playerOne.x - (playerOne.drawingw-playerOne.w)/2;
        playerOne.drawingy = playerOne.y - (playerOne.drawingh-playerOne.h)/2 + 10;
        */
        if(e.currentFrame >= enemySprite[e.state].length -1){
            e.currentFrame = 0;
        }
        // enemy health
        context.fillStyle='red';
        context.fillRect(e.x-camera.x, e.y-45, 100, 5);
        context.fillStyle='green';
        context.fillRect(e.x-camera.x, e.y-45, e.health*100, 5);

        context.drawImage(enemySprite[e.state][e.currentFrame], e.x - ((e.w * (e.w/46))-e.w)/2 - camera.x, e.y - ((e.h * (e.h/46))-e.h)/2 - 20, e.w * (e.w/46), e.h * (e.h/46));
        e.frames__++;
        if (e.currentFrame <= enemySprite[e.state].length - 1 && e.frames__ == 12) {
            e.currentFrame++;
            e.frames__ = 0;
            // if(e.state == "death"){
            //     setTimeout(()=>{
            //         createEnemy(i)
            //     }, 250)
            // }
            if(e.state == "death"){
                createEnemy(i)
            }
        } else if(e.currentFrame == enemySprite[e.state].length-1){
            e.currentFrame = 0;
        }

        if (e.gravity && e.y + e.h < canvas.height - 50) {
            e.y += 1;
        }
    });
}

// ground
var groundProperties = {
    w: 16,
    h: (40*2)+2,
    x: 16,
    y: canvas.height,
    amount: Math.ceil((canvas.width*3)/16)
}
function ground() {
    context.fillStyle = 'green';
    for (let i = 0; i < groundProperties.amount; i++) {
        context.drawImage(groundImage, (groundProperties.x * i )- camera.x, groundProperties.y - groundProperties.h, groundProperties.w, groundProperties.h);
    }
}

// house
var houseproperties =[
    {
        x: canvas.width/2 - camera.x - (229*(canvas.width/229))/2,
        y: canvas.height-(251*(canvas.height/251)),
        w: 229*(canvas.height/251),
        h: 251*(canvas.height/251) - (40*2)
    },
    {
        x: canvas.width/2 - camera.x - (229*(canvas.width/229))/2+10+(229*(canvas.height/251)),
        y: canvas.height-(251*(canvas.height/251)),
        w: 229*(canvas.height/251),
        h: 251*(canvas.height/251) - (40*2)
    },
    {
        x: canvas.width/2 - camera.x - (229*(canvas.width/229))/2+10+((229*(canvas.height/251))*2),
        y: canvas.height- (251*(canvas.height/251)),
        w: 229*(canvas.height/251),
        h: 251*(canvas.height/251) - (40*2)
    }
]
function drawhouses(){
    context.drawImage(housesImage[0], houseproperties[0].x - camera.x, houseproperties[0].y, houseproperties[0].w, houseproperties[0].h);
    context.drawImage(housesImage[1], houseproperties[1].x - camera.x, houseproperties[1].y, houseproperties[1].w, houseproperties[1].h);
    context.drawImage(housesImage[2], houseproperties[2].x - camera.x, houseproperties[2].y, houseproperties[2].w, houseproperties[2].h);
}

// background
function drawbackround(){
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    context.drawImage(middlebackgroundImage, 0-(camera.x*1.5), canvas.height/4, canvas.width, canvas.height*3/4);
    context.drawImage(middlebackgroundImage, canvas.width-(camera.x*1.5), canvas.height/4, canvas.width, canvas.height*3/4);
    context.drawImage(middlebackgroundImage, (canvas.width*2)-(camera.x*1.5), canvas.height/4, canvas.width, canvas.height*3/4);
    context.drawImage(middlebackgroundImage, (canvas.width*3)-(camera.x*1.5), canvas.height/4, canvas.width, canvas.height*3/4);
}

// score
function score(){
    context.font = '50px JoystixMonospace';
    context.fillStyle = 'black';
    const textOne = playerOne.score;
    const textWidthone = context.measureText(textOne).width;
    const textHeightone = 50;
    
    const xone = (textWidthone);
    const yone = (textHeightone)+10;
    
    context.fillText(textOne, xone-.5, yone-.5);
}

// start screen
var gamestarted = false;
var blinker = 0, frameps = 0;
function game(){
    // enter
    context.font = '15px JoystixMonospace';
    context.fillStyle = 'black';
    const text = "<Press ENTER to start>";
    const textWidth = context.measureText(text).width;
    const textHeight = 50;
    
    const x = (canvas.width - textWidth) / 2;
    const y = (canvas.height + textHeight) / 2;
    
    context.fillText(text, x, y+50);

    // game name
    context.font = '50px JoystixMonospace';
    context.fillStyle = 'black';
    const textOne = "Planet Survival";
    const textWidthone = context.measureText(textOne).width;
    const textHeightone = 50;
    
    const xone = (canvas.width - textWidthone) / 2;
    const yone = (canvas.height + textHeightone) / 2;
    
    context.fillText(textOne, xone-.5, yone-.5);

    if(camera.x < canvas.width*1.7){
        camera.x++;
    }
}

// game over
var gameisover = false;
function gameover(){
    // game name
    context.font = '50px JoystixMonospace';
    context.fillStyle = 'black';
    const textOne = "Score: "+playerOne.score;
    const textWidthone = context.measureText(textOne).width;
    const textHeightone = 50;
    
    const xone = (canvas.width - textWidthone) / 2;
    const yone = (canvas.height + textHeightone) / 2;
    
    context.fillText(textOne, xone-.5, yone-.5);

    // enter
    context.font = '15px JoystixMonospace';
    context.fillStyle = 'black';
    const text = "<Press ENTER to start>";
    const textWidth = context.measureText(text).width;
    const textHeight = 50;
    
    const x = (canvas.width - textWidth) / 2;
    const y = (canvas.height + textHeight) / 2;
    
    context.fillText(text, x, y+50);
    if(camera.x < canvas.width*1.7){
        camera.x++;
    }
}

function update(){
    clear();
    cameraupdate();    
    drawbackround();  

    drawhouses();
    ground();

    if(gameisover){
        gameover()
    }

    if(!gamestarted && !gameisover){
        game();
    }
    if(gamestarted && !gameisover){
        drawPlayerOne();
        drawEnemy();
        score();
    }
    
    
    requestAnimationFrame(update);
}
update();

