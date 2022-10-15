// import kaboom from "https://unpkg.com/kaboom/dist/kaboom.mjs";
kaboom({
    global: true,
    fullscreen: true,
    debug: true,
    font: 'sinko',
    scale: 1,
    background: [255, 255, 255],
    canvas: document.getElementById("canvas"),
})

// loadFont("flappy-font","sprites/FlappyBirdRegular-9Pq0.ttf")
loadSprite("background-day", "sprites/background-day.png")

loadSprite("start-message", "sprites/message.png");
loadSprite("end-message", "sprites/gameover.png");
loadSprite("start", "sprites/start.png");

loadSprite("yellowbird-one", "sprites/yellowbird-downflap.png")
loadSprite("yellowbird-two", "sprites/yellowbird-midflap.png")
loadSprite("yellowbird-three", "sprites/yellowbird-upflap.png")

loadSprite("pipe-green", "sprites/pipe-green.png")
loadSprite("pipe-red", "sprites/pipe-red.png")
loadSprite("base", "sprites/base.png")

// background state
var background = "background-day";
var pipe = {
    name: "pipe-green",
    w: 50,
    h: 500,
};

scene("intro", ()=>{
    add([
        sprite(background, {
            width: width(),
            height: height(),
        })
    ])
    add([
        sprite("start-message", {
            width: width()/2,
            height: height()-50,
        }),
        pos(width()/4, 25)
    ])
    onClick(()=>{
        go("game")
    });
});

var score ={
    v: 0,
    high: 0,
    fast: 5,
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



scene("game",()=>{
    layers([
        "bg",
        "game",
        "ui",
    ], "game")
    
    add([
        sprite(background, {
            width: width(),
            height: height(),
        }),
        layer("bg"),
    ])
    var scoretext = add([
        text(score.v, {
            size: 50,
        }),
        origin("center"),
        pos(width()/2, 100),
        layer("ui")
    ]);
    const player = add([
        pos(80, 120),
        sprite("yellowbird-one"),
        scale(4),
        area(),
        body(),
        "player"
    ])

    onClick(()=>{
        player.jump(400);
    })

    var gap = 250;
    function producePipes(){
        const offset = rand(-100, 100);
        add([
            sprite(pipe.name, {height: height()}),
            pos(width(), height()/2 + offset + gap/2),
            "pipe",
            area(),
            {passed: false,},
        ]);

        add([
            sprite(pipe.name, {flipY: true,height: height()}),
            pos(width(), height()/2 + offset - gap/2),
            origin("botleft"),
            "pipe",
            area()
        ]);
        every("pipe", (pipe)=>{
            if (pipe.pos.x < 0) {
                pipe.destroy();
            }
        })
    }
    onCollide("pipe", "player", () => {
        // debug.log("collision")
        go("gameover")
    })
    onUpdate("pipe", (pipe)=>{
        pipe.move(-160, 0)
        if(pipe.passed == false && pipe.pos.x < player.pos.x){
           pipe.passed = true;
           score.v+=1;
           scoretext.text = score.v;
        }
    })

    loop(score.fast, ()=>{
        producePipes();
    })

    add([
        pos(0, height()-10),
        sprite("base",{
            width: width(),
            height: 100
        }),
        area(),
        solid(),
        layer("ui"),
        "base"
    ]);
    add([
        pos(0, 0-90),
        sprite("base",{
            flipY: true,
            width: width(),
            height: 100
        }),
        area(),
        solid(),
        layer("ui"),
        "base",
        "ceil"
    ]);
    var elm = document.getElementById("some");
    onKeyPress("f", (elm) => {
      fullscreen(isFullscreen())
    })
});

scene("gameover",()=>{
    add([
        sprite(background, {
            width: width(),
            height: height(),
        })
    ])
    var scoretext = add([
        text(score.v, {
            size: 100,
        }),
        origin("center"),
        pos(width()/2, height()/2 -170+100),
        layer("ui")
    ]);
    add([
        sprite("end-message", {width: width()/2}),
        pos(width()/2, height()/2-250),
        origin("center"),
    ])
    add([
        sprite("start", {width: width()/3}),
        pos(width()/2, height()/2+150),
        origin("center"),
        area(),
        "start",
    ])
    onClick("start", () => {
        score.v = 0;
        go("intro")
    })
    onClick(() => {
        score.v = 0;
        go("intro")
    })
});

go("intro");

/* 
    const gap = 100;
    var offset = rand(-50, 50);

    function producePipe(){
        add([
            sprite(pipe.name,{
                flipY: true,
                width: pipe.w,
                height: pipe.h,
            }),
            pos(width(), height()/2 - gap/2 + offset - pipe.h),
            area(),
            solid(),
            "pipe",
        ])
    
        add([
            sprite(pipe.name,{
                flipY: false,
                width: pipe.w,
                height: pipe.h,
            }),
            pos(width(), height()/2 + gap/2 + offset),
            area(),
            solid(),
            "pipe",
        ])
    }

onClick(()=>{
    debug.log("space");
    player.jump();
});
*/