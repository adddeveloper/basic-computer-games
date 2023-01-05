// import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
kaboom({
    global: true,
    fullscreen: true,
    debug: true,
    scale: 1,
    background: [255, 255, 255],
    canvas: document.getElementById("canvas"),
})

loadRoot('sprites/')
loadSprite("player", "Player.png")
loadSprite("computer", "Computer.png")
loadSprite("ball", "Ball.png")
loadSprite("menui","menu.png")
loadSprite("starti","start.png")
loadSprite("restarti","restart.png")
loadSprite("arrow", "arrow.png")
loadSprite("w", "w.png")
loadSprite("s", "s.png")
loadSprite("one", "one.png")
loadSprite("two", "two.png")

var score = {
    computer: 0,
    player: 0,
}
var startNow = false;
scene("ai_game", ()=>{
        var line = add([
            pos(width()/2, 0),
            rect(5, height()),
            outline(1),
            color(0,0,0),
            "line"
        ])
        const scorePPP = add([
            text("0"), pos(width()/2 + 10, 10)
        ])

        const scoreCCC = add([
            text("0"), pos(width()/2 - 50, 10)
        ])
        // player paddle
        const player = add([
            sprite("player"),
            pos(width()/2 + 450, height()/2-50),
            area(),
            {
                speed: 330
            },
            
            "player",
        ])
        // ball
        const ball = add([
            sprite("ball"),
            pos(width()/2 -30/2, height()/2),
            area(),
            {
                ax : 6,
                ay: 6
            },
            "ball",
        ])
        // computer paddle
        const computer = add([
            sprite("computer"),
            pos(35, height()/2 - 50),
            area(),
            {
                speed: 330
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
            startNow = true;
            if(startNow == true){
                onKeyDown("up", () => {
                    computer.move(0, -computer.speed)
                })
                onKeyRelease("up", () => {
                    computer.move(0, 0)
                })
                onKeyDown("down", () => {
                    computer.move(0, computer.speed)
                })
                onKeyRelease("down", () => {
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
            score.computer = 0;
            scoreCCC.text = score.computer.toString();
            score.player = 0;
            scorePPP.text = score.player.toString();
            startNow= false;
            ball.pos.x =width()/2 -30/2;ball.pos.y = height()/2
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
            score.computer = 0;
            score.player = 0;
            go("mainMenu")
        });
    function update(){
        if (startNow == true){
            ball.pos.x += ball.ax;
            ball.pos.y += ball.ay;
            if(ball.pos.x + ball.width/2 >= width()/2){
                player.moveTo(width()/2 + 450, ball.pos.y);
            } else{
                player.moveTo(width()/2 + 450, height()/2-50)
            }
        }
        if(ball.pos.x < 0){
            ball.pos.x =width()/2;ball.pos.y = height()/2;

            score.player += 1;
            scorePPP.text = score.player.toString();
            ball.ax *= -1; 
        } if (ball.pos.x + ball.width > canvas.width){
            ball.pos.x =width()/2;ball.pos.y = height()/2;
            
            score.computer += 1;
            scoreCCC.text = score.computer.toString();
            ball.ax *= -1;
        }

        if(ball.pos.y < 0){
            ball.ay *= -1; 
        } if (ball.pos.y + ball.height > canvas.height){
            ball.ay *= -1;
        }

        // computer wall bound
        if(computer.pos.y < 0){
            computer.ay *= -1; 
        } if (computer.pos.y + computer.height > canvas.height){
            computer.ay *= -1;
        }
        /*
        if(ball.pos.x+ball.width < width()/2) {
            player.moveTo(width()/2 + 450, height()/2 - 50);
        }
        */

        if(score.player == 10 || score.computer == 10){
            go("gameOver")
        }
        requestAnimationFrame(update)
    }update();
    // collision
    ball.onCollide("player", ()=>{
        ball.ax *= -1;
    })
    ball.onCollide("computer", ()=>{
        ball.ax *= -1;
    })
})
scene("gameOver", ()=>{
    add([
        text("Game Over"), pos(width()/2 - 200, height()/2-100)
    ])
    if(score.computer == score.player){
        add([
            text("-Tie-", {
                size: 30
            }), pos(width()/2 - 130, height()/2)
        ])
    } else if(score.computer > score.player) {
        add([
            text("Blue Wins!", {
                size: 30
            }), pos(width()/2 - 130, height()/2)
        ])
    } else if(score.computer < score.player) {
        add([
            text("Red Wins!", {
                size: 30
            }), pos(width()/2 - 130, height()/2)
        ])
    }
    // setTimeout(()=>{
        score.computer = 0;
        score.player = 0;
    //     go("main")
    // }, 3000)
})


scene("startScreen", ()=>{
    add([
        text("Ping Pong"),
        pos(width()/2 - 200, height()/2 - 35),
        fixed(),
    ])

    add([
        text("(Press <START> to start)",{
            size: 25
        }),
        pos(width()/2 - 190, height()/2 + 50),
        color(30,30,30),
        outline(0),
        fixed(),
    ])
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
        go("mainMenu")
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
    onHover("restart",()=>{
        restartRect.color.b = 0;
        restartRect.color.r = 0;
        restartRect.color.g = 0;
    },()=>{
        restartRect.color.b = 255;
        restartRect.color.r = 255;
        restartRect.color.g = 255;
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
        go("mainMenu")
    });
})

scene("mainMenu", ()=>{
    const choose = {
        posx: width()/2 - 400,
        posy: height()/2 - 200,
    }
    const oneAiRect= add([
        pos(choose.posx, choose.posy),
        rect(300, 200), outline(2),
        color(255,255,255),
        area(),
        "ai"
    ]);
    const oneAi = add([
        sprite("one",{
            width: 100,
            height: 100,
        }),
        pos(oneAiRect.pos.x+oneAiRect.width/2-50, oneAiRect.pos.y+oneAiRect.height/2-50),
        area(),
        "ai"
    ]);
    add([
        text("single player",{
            size: 20
        }),
        pos(oneAi.pos.x-30, oneAi.pos.y+120),
        color(0,0,0),
        outline(0)
    ])
    onClick("ai",()=>{
        go("ai_game")
    })

    const twoHumanRect= add([
        pos(choose.posx + 450, choose.posy),
        rect(300, 200), outline(2),
        color(255,255,255),
        area(),"human",
    ]);
    const twoHuman = add([
        sprite("two",{
            width: 100,
            height: 100,
        }),
        pos(twoHumanRect.pos.x+twoHumanRect.width/2-50, twoHumanRect.pos.y+twoHumanRect.height/2-50),
        area(),"human",
    ]);
    add([
        text("multiplayer",{
            size: 20
        }),
        pos(twoHuman.pos.x-20, twoHuman.pos.y+120),
        color(0,0,0),
        outline(0)
    ])
    onClick("human",()=>{
        go("human_game")
    })

    function controlHuman(){
        const arrowHuman = {
            posx: width()/2 - 350,
            posy: height()/2 + 30
        }
        add([
            text("-Controls-",{
                size: 25
            }),
            color(0,0,0),
            pos(arrowHuman.posx, arrowHuman.posy)
        ])
        add([
            sprite("arrow",{
                width: 30,
                height: 30
            }),
            pos(arrowHuman.posx, arrowHuman.posy+30),
            rotate(0)
        ])
    
        add([
           text("up",{
               size: 16
           }),
            pos(arrowHuman.posx+50, arrowHuman.posy+30),
            color(0,0,0),
            rotate(0)
        ])
    
        add([
            sprite("arrow",{
                width: 30,
                height: 30
            }),
            pos(arrowHuman.posx + 30, arrowHuman.posy+100),
            rotate(180)
        ])
        add([
            text("down",{
                size: 16
            }),
             pos(arrowHuman.posx+50, arrowHuman.posy+70),
             color(0,0,0),
             rotate(0)
         ])
    } controlHuman();
    function controlAi(){
        const arrowAi = {
            posx: width()/2 + 100,
            posy: height()/2 + 30
        }
        add([
            text("-Controls-",{
                size: 25
            }),
            color(0,0,0),
            pos(arrowAi.posx+30, arrowAi.posy)
        ])
        add([
            sprite("arrow",{
                width: 30,
                height: 30
            }),
            pos(arrowAi.posx, arrowAi.posy+30),
            rotate(0)
        ])
    
        add([
           text("up",{
               size: 16
           }),
            pos(arrowAi.posx+50, arrowAi.posy+30),
            color(0,0,0),
            rotate(0)
        ])
    
        add([
            sprite("arrow",{
                width: 30,
                height: 30
            }),
            pos(arrowAi.posx + 30, arrowAi.posy+100),
            rotate(180)
        ])
        add([
            text("down",{
                size: 16
            }),
             pos(arrowAi.posx+50, arrowAi.posy+70),
             color(0,0,0),
             rotate(0)
         ])
        //  player2 ----------------------------------
        add([
            sprite("w",{
                width: 25,
                height: 25
            }),
            pos(arrowAi.posx+130, arrowAi.posy+30),
            rotate(0)
        ])
    
        add([
           text("up",{
               size: 16
           }),
            pos(arrowAi.posx+170, arrowAi.posy+35),
            color(0,0,0),
            rotate(0)
        ])
    
        add([
            sprite("s",{
                width: 25,
                height: 25
            }),
            pos(arrowAi.posx + 130, arrowAi.posy+70),
        ])
        add([
            text("down",{
                size: 16
            }),
             pos(arrowAi.posx+170, arrowAi.posy+75),
             color(0,0,0),
             rotate(0)
         ])
    } controlAi();

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
        go("startScreen")
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
    onHover("restart",()=>{
        restartRect.color.b = 0;
        restartRect.color.r = 0;
        restartRect.color.g = 0;
    },()=>{
        restartRect.color.b = 255;
        restartRect.color.r = 255;
        restartRect.color.g = 255;
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
    onHover("menu",()=>{
        menuRect.color.b = 0;
        menuRect.color.r = 0;
        menuRect.color.g = 0;
    },()=>{
        menuRect.color.b = 255;
        menuRect.color.r = 255;
        menuRect.color.g = 255;
    })
})



go("startScreen")