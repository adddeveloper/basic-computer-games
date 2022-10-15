var scoreOne = {
    computer: 0,
    player: 0,
}
var startNowOne = false;

scene("human_game",()=>{
wait(0.5, ()=>{
    var line = add([
        pos(width()/2, 0),
        rect(5, height()),
        outline(1),
        color(0,0,0),
        "line"
    ])
    const scoreP = add([
        text("0"), pos(width()/2 + 10, 10)
    ])

    const scoreC = add([
        text("0"), pos(width()/2 - 50, 10)
    ])
    // player paddle
    const player = add([
        sprite("player"),
        pos(width()/2 + 450, height()/2-50),
        area(),
        {
            speed: 10
        },
        
        "player",
    ])
    // ballhuman
    const ballhuman = add([
        sprite("ball"),
        pos(width()/2 -30/2, height()/2),
        area(),
        {
            ax : 6,
            ay: 6
        },
        "ballhuman",
    ])
    // computer paddle
    const computer = add([
        sprite("computer"),
        pos(35, height()/2 - 50),
        area(),
        {
            speed: 10
        },
        
        "computer",
    ])
// function buttons(){
    const buttonPos ={
        posx: width()/2,
        posy: height()-50,
    }
    // start button
    const startRect= add([
        pos(buttonPos.posx - 250, buttonPos.posy),
        rect(100, 20), outline(2),
        color(255,255,255),
        area(),
        "start"
    ]);
    const starticon = add([
        sprite("starti",{
            width: 10,
            height: 10,
        }),
        pos(startRect.pos.x + 10, startRect.pos.y + 4.5),
        area(),
        "start"
    ])
    const start= add([
        text("start",{
            size: 16
        }),
        pos(startRect.pos.x + 30, startRect.pos.y+2.5),
        area(),
        "start"
    ]);
    onClick("start",()=>{
        startNowOne = true;
        if(startNowOne == true){
            onKeyDown("up", () => {
                // player.move(0, -player.speed)
                player.pos.y -= player.speed;
            })
            onKeyRelease("up", () => {
                player.move(0, 0)
            })
            onKeyDown("down", () => {
                // player.move(0, player.speed)
                player.pos.y += player.speed;
            })
            onKeyRelease("down", () => {
                player.move(0, 0)
            })
                
            onKeyDown("w", () => {
               // computer.move(0, -computer.speed)
               computer.pos.y -= computer.speed;
            })
            onKeyRelease("w", () => {
                computer.move(0, 0)
            })
            onKeyDown("s", () => {
               // computer.move(0, computer.speed)
               computer.pos.y += computer.speed;
            })
            onKeyRelease("s", () => {
                computer.move(0, 0)
            })
        }
    })

    // restart button
    const restartRect= add([
        pos(buttonPos.posx - 50, buttonPos.posy),
        rect(100, 20),
        color(255,255,255), outline(2),
        area(),
        "restart"
    ]);
    const restarticon = add([
        sprite("restarti",{
            width: 15,
            height: 15,
        }),
        pos(restartRect.pos.x + 10, restartRect.pos.y + 3.5),
        area(),
        "restart"
    ])
    const restart=add([
        text("restart", {
            size: 16
        }),
        pos(restartRect.pos.x + 30, restartRect.pos.y+2.5),
        area(),
        "restart"
    ]);
    onClick("restart",()=>{
        scoreOne.computer = 0;
        scoreC.text = scoreOne.computer.toString();
        scoreOne.player = 0;
        scoreP.text = scoreOne.player.toString();
        startNowOne= false;
        ballhuman.pos.x =width()/2 -30/2;ballhuman.pos.y = height()/2
    })

    // menu button
    const menuRect= add([
        pos(buttonPos.posx + 150, buttonPos.posy),
        rect(100, 20),
        color(255,255,255), outline(2),
        area(),
        "menu"
    ]);
    const menu=add([
        text("menu",{
            size: 20
        }),
        pos(menuRect.pos.x+30, menuRect.pos.y+0.5),
        area(),
        "menu"
    ]);
    const menuicon = add([
        sprite("menui",{
            width: 15,
            height: 15,
        }),
        pos(menuRect.pos.x + 10, menuRect.pos.y + 2.5),
        area(),
        "menu"
    ])
    onClick("menu",()=>{
        scoreOne.computer = 0;
        scoreOne.player = 0;
        go("mainMenu")
    });
function update(){
    if (startNowOne == true){
        ballhuman.pos.x += ballhuman.ax;
        ballhuman.pos.y += ballhuman.ay;
    }
    if(ballhuman.pos.x < 0){
        ballhuman.pos.x =width()/2;ballhuman.pos.y = height()/2;

        scoreOne.player++;
        scoreP.text = scoreOne.player.toString();
        ballhuman.ax *= -1; 
    } if (ballhuman.pos.x + ballhuman.width > canvas.width){
        ballhuman.pos.x =width()/2;ballhuman.pos.y = height()/2;
        
        scoreOne.computer++;
        scoreC.text = scoreOne.computer.toString();
        ballhuman.ax *= -1;
    }

    if(ballhuman.pos.y < 0){
        ballhuman.ay *= -1; 
    } if (ballhuman.pos.y + ballhuman.height > canvas.height){
        ballhuman.ay *= -1;
    }

    // computer wall bound
    if(computer.pos.y < 0){
        computer.ay *= -1; 
    } if (computer.pos.y + computer.height > canvas.height){
        computer.ay *= -1;
    }
    /*
    if(ballhuman.pos.x+ballhuman.width < width()/2) {
        player.moveTo(width()/2 + 450, height()/2 - 50);
    }
    */

    if(scoreOne.player == 10 || scoreOne.computer == 10){
        go("gameOverOne")
    }
    requestAnimationFrame(update)
}update();
// collision
ballhuman.onCollide("player", ()=>{
    ballhuman.ax *= -1;
})
ballhuman.onCollide("computer", ()=>{
    ballhuman.ax *= -1;
})
})
})
scene("gameOverOne", ()=>{
    add([
        text("Game Over"), pos(width()/2 - 200, height()/2-100)
    ])
    if(scoreOne.computer == scoreOne.player){
        add([
            text("-Tie-", {
                size: 30
            }), pos(width()/2 - 130, height()/2)
        ])
    } else if(scoreOne.computer > scoreOne.player) {
        add([
            text("Blue Wins!", {
                size: 30
            }), pos(width()/2 - 130, height()/2)
        ])
    } else if(scoreOne.computer < scoreOne.player) {
        add([
            text("Red Wins!", {
                size: 30
            }), pos(width()/2 - 130, height()/2)
        ])
    }
    // setTimeout(()=>{
        scoreOne.computer = 0;
        scoreOne.player = 0;
    //     go("main")
    // }, 3000)
})
