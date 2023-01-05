// import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
kaboom({
    global: true,
    fullscreen: true,
    debug: true,
    scale: 1,
    background: [255, 255, 255],
    canvas: document.getElementById("canvas"),
})
var score ={
    v: 0,
    high: 0,
    fast: 2.75,
}


if(score.v >= 3){
    score.fast = 2.5
} else if(score.v >= 5){
    score.fast = 2
} else if(score.v >= 10){
    score.fast = 1.75
} else if(score.v >= 20){
    score.fast = 1.5
} else if(score.v >= 30){
    score.fast = 1
} else if(score.v >= 40){
    score.fast = .75
}

// See #SpriteAtlasData type for format spec
loadSpriteAtlas("sprites/loki.png", {
    "dino": {
        x: 0,
        y: 0,
        width: 1128,
        height: 21,
        sliceX: 47,
        sliceY: 1,
        anims: {
            idle: { from: 36, to: 39, loop: true, },
            hatched: { from: 39, to: 46, loop: true, },
            run: { from: 17, to:25, loop: true, },
            jump: { from: 1, to: 9, loop: true, },
            // run: { from: 1, to: 9, loop: true, },
            // jump: { from: 32, to: 35, loop: true, },
            die: { from: 17, to: 13, loop: true, },
            dieOnce: { from: 17, to: 13 },
        },
    },
})
loadSprite("background", "sprites/background1.png")
loadSprite("restart", "sprites/restart.png")
loadSpriteAtlas("sprites/nature.png", {
    "base": {
        x: 0,
        y: 0,
        width: 192,
        height: 96,
        sliceX: 4,
        sliceY: 6,
        anims: {
            idle: { from: 0, to: 0, loop: false,},
        },
    },
})
var state = false;
debug.inspect = false;
scene("game", ()=>{
    document.body.addEventListener("keypress", (e)=>{
        if(e.key == "f"){
            fullscreen(!isFullscreen())        
        }
    })
    layers([
        "bg",
        "game",
        "ui",
    ], "game")
    // background
    function backside(){
        add([
            sprite("background",{
                width: width(), flipY: true,
                height: height()
            }),
            pos(0,0), layer("bg"), "background1",
        ])
    } backside();
    var scoretext = add([
        text(score.v, {
            size: 50,
        }),
        origin("center"),
        pos(width()/2, 100),
        layer("ui")
    ]);
    const base = add([
        sprite("base", {
            anim: "idle",
            width: width(),
            // height: 30,
        }),
        area({
            height: 30
        }),
        pos(0, height()-30),
        solid(), layer("game"), color(0,50,0),
        "base",
    ])
    function grounditems(){
       /*
        add([
            sprite("plant", {
                anim: "idle",
                width: 10,
            }),
            pos(),
        ]) 
        */     
    } grounditems();
    const player = add([
        // rect(25,55),
        sprite("dino", {
            anim: "idle",
            height: 90,
            scale: 1.2,
        }),
        pos(90, 100),
        outline(4),
        area({width:30, height: 90}),
        body(),
        origin("center"),
        "player",
        scale(2)
    ])
    // movement
    onClick(()=>{
        state = true;
        // player.play("hatched");
        if(player.grounded()){
            player.jump(750);
            player.play("jump")
        }
    })
    
    document.addEventListener("keydown", (e)=>{
        if (e.code == "Space"){
            
            state = true;
            // player.play("hatched");
            if(player.grounded()){
                player.jump(750);
                player.play("jump")
            }
        }
    });
    onKeyPress("space",()=>{
        state = true;
        // player.play("hatched");
        if(player.grounded()){
            player.jump(750);
            player.play("jump")
        }
    })
    onTouchMove(()=>{
        state = true;
        // player.play("hatched");
        if(player.grounded()){
            player.jump(750);
            player.play("jump")
        }
    })
    // running animation
    onCollide("player", "base", ()=>{
        if(state == true){
            player.play("run")
        }
    })

    function enemySpawner(){
        var enemy = add([
            rect(30, 60),
            color(255,0,0),
            area(),
            pos(width()-30, height()-150),
            "cactus",
            {passed: false},
            scale(2)
        ])
    }
    
    onCollide("cactus", "player", () => {
        // debug.log("collision")
        var allen = get("cactus");
        var person = get("player");
        player.play("die")
        go("gameover", allen, person);
        state = false;
    })
    onUpdate("cactus", (cactus)=>{
        if(state){
            cactus.move(-260, 0)
        }
        if(cactus.passed == false && cactus.pos.x < player.pos.x){
           cactus.passed = true;
           score.v+=1;
           scoretext.text = score.v;
        }
    })
    loop(score.fast, ()=>{
        if(state){
            enemySpawner();
        }
    })
})
scene("gameover", (allen, person)=>{
    //"/*"
    layers([
        "bg",
        "game",
        "ui",
    ], "game")
    // background
    add([
        sprite("background",{
            width: width(), flipY: true,
            height: height()
        }),
        pos(0,0), layer("bg"), "background1",
    ])
    var scoretext = add([
        text(score.v, {
            size: 35,
        }),
        origin("center"),
        pos(width()/2, 100),
        layer("ui")
    ]);
    // end background
    add([
        sprite("dino", {
            anim: "dieOnce",
            height: 90,
            scale: 1.2,
        }),
        area({width:30, height: 90}),
        pos(person[0].pos.x - 10, person[0].pos.y),
        origin("center"),
        color(255,0,0),
        scale(2)
    ])
    for(var i=0; i < allen.length; i++){
        add([
            rect(allen[i].width, allen[i].height),
            pos(allen[i].pos.x, allen[i].pos.y),
            color(0,0,0),
            scale(2)
        ]) 
    }
    add([
        sprite("base", {
            anim: "idle",
            width: width(),
            // height: 30,
        }),
        area({
            height: 30
        }),
        pos(0, height()-30),
        solid(), layer("bg"), color(0,50,0),
        "base",
    ])
    //"*/"

    const restart = add([
        sprite("restart",{
            width: 50, height: 50
        }),
        color(255,255,255),
        area(),
        pos(width()/2 - 50/2, 130),
        layer("game"),
        z(1000),
        "restart",
    ])
    onClick(() => {
        go("game");
        state = false;
        score.v = 0;
    })
    onTouchMove(()=>{
        go("game");
        state = false;
        score.v = 0;
    })
})
go("game")

// document.body.addEventListener("keypress", (e)=>{
//     if(e.key == "f" && screenfull.isEnabled){
//         screenfull.toggle(thisone)
//     }
// })
