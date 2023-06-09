window.addEventListener("keydown", (e)=>{
    if(game){
        if(e.key === "d"){
            player.speed = 7;
        } else if(e.key === "a"){
            player.speed = -7;
        }
    }
})
canvas.addEventListener("click", (e)=>{
    if(game && canshoot){
        createBullet()
        if(numberofbullets > 0){
            numberofbullets -= 1;
        }
    }
})

canvas.addEventListener("click", ()=>{
    console.log(canshoot)
    if(!game){
        gamescreen = false;
        game = true;
        endscreen = false;
        obsticles = []
        numberofbullets = 1;
        canshoot = true;
        score = 0;
    }
})

window.addEventListener("keyup", (e)=>{
        if (e.key === "d" || e.key === "a") {
            player.speed = 0;
        }
})

