// keyboard.js

// this is the last file. I am done
var timerOne = 0;
var timerTwo = 0;
var coolDown = 1000;

window.addEventListener("keydown", (e) => {
    if (e.key === "d"){
        camera.x++;
    }

    if (e.key === "Enter" && !gamestarted) {
        playerOne.state = "idle";
        createEnemy();
        camera.x = 0;
        gamestarted = true;
    } else if(e.key === "Enter" && gamestarted == true && gameisover){
        playerOne.state = "idle";
        createEnemy();
        camera.x = 0;
        gameisover = false;
        gamestarted = false;
    }
    if(!gamestarted) return;
    var currentTime = new Date().getTime();

    if (e.key === "d" && playerOne.state != "strike") {
        playerOne.speed = 1;
        camera.speed = 2;
        playerOne.state = "walk";
    } 
    else if (e.key === "a") {
        playerOne.speed = -1;
        camera.speed = -2;
        playerOne.state = "walkLeft";
    }
     else if (e.key === "w") {
        if (currentTime - timerOne > coolDown) {
            timerOne = currentTime;
            playerOne.state = "strike";
            enemies.forEach((e,i)=>{
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
                })){
                    e.health--;
                    if(e.health <= 0){
                        playerOne.score++;
                        e.state = "death";
                        e.currentFrame = 0;
                        e.frames__ = 0;
                        console.log("enemy death")
                    }
                    console.log("enemy health: ",e.health)
                }
            })
        }
    }

    // if (e.key === "ArrowLeft") {
    //     playerTwo.speed = 7;
    //     playerTwo.state = "walk";
    // } else if (e.key === "ArrowRight") {
    //     playerTwo.speed = -7;
    //     playerTwo.state = "walk";
    // } else if (e.key === "ArrowUp") {
    //     if (currentTime - timerOne > coolDown) {
    //         playerTwo.health--;
    //         timerOne = currentTime;
    //         playerTwo.state = "idle";
    //     }
    // }
});


window.addEventListener("keyup", (e) => {
    if(!gamestarted) return;
    if (e.key === "d" || e.key === "a" || e.key === "w") {
        // playerOne.speed = 0;
        camera.speed = 0;
        playerOne.speed = 0;
        currentFrameOne = 0;
        playerOne.state = 'idle';
    }
})