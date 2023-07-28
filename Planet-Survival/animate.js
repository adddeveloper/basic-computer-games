// animate.js

// image loader
function loadSprite(x){
    const image = new Image();
    image.src = x;
    // document.body.appendChild(image)
    return image;
}

// playerOne
var playerOneSpriteUrl = {
    idle: [
        "images/playerOne/idle/tile000.png",
        "images/playerOne/idle/tile001.png",
        "images/playerOne/idle/tile002.png",
        "images/playerOne/idle/tile003.png",
        "images/playerOne/idle/tile004.png",
        "images/playerOne/idle/tile005.png",
        "images/playerOne/idle/tile006.png",
        "images/playerOne/idle/tile007.png",
        "images/playerOne/idle/tile008.png",
        "images/playerOne/idle/tile009.png"
    ],
    walk: [
        "images/playerOne/walk/tile000.png",
        "images/playerOne/walk/tile001.png",
        "images/playerOne/walk/tile002.png",
        "images/playerOne/walk/tile003.png",
        "images/playerOne/walk/tile004.png",
        "images/playerOne/walk/tile005.png",
        "images/playerOne/walk/tile006.png",
        "images/playerOne/walk/tile007.png"
    ],
    strike: [
        "images/playerOne/strike/tile000.png",
        "images/playerOne/strike/tile001.png",
        "images/playerOne/strike/tile002.png",
        "images/playerOne/strike/tile003.png",
        "images/playerOne/strike/tile004.png",
        "images/playerOne/strike/tile005.png",
        "images/playerOne/strike/tile006.png"
    ],
    death: [
        "images/playerOne/death/tile000.png",
        "images/playerOne/death/tile001.png",
        "images/playerOne/death/tile002.png",
        "images/playerOne/death/tile003.png",
        "images/playerOne/death/tile004.png",
        "images/playerOne/death/tile005.png",
        "images/playerOne/death/tile006.png",
        "images/playerOne/death/tile007.png",
        "images/playerOne/death/tile008.png",
        "images/playerOne/death/tile009.png",
        "images/playerOne/death/tile010.png"
    ],
    walkLeft: [
        "images/playerOne/walkLeft/tile000.png",
        "images/playerOne/walkLeft/tile001.png",
        "images/playerOne/walkLeft/tile002.png",
        "images/playerOne/walkLeft/tile003.png",
        "images/playerOne/walkLeft/tile004.png",
        "images/playerOne/walkLeft/tile005.png",
        "images/playerOne/walkLeft/tile006.png",
        "images/playerOne/walkLeft/tile007.png"
    ]
}
var playerOneSprite = {
    idle: [],
    walk: [],
    strike: [],
    death: [],
    walkLeft: []
}

for (let i = 0; i < Object.keys(playerOneSpriteUrl).length; i++) {
    playerOneSpriteUrl[Object.keys(playerOneSpriteUrl)[i]].forEach(e => {
        playerOneSprite[Object.keys(playerOneSpriteUrl)[i]].push(loadSprite(e))
    });    
}

// background
var backgroundImage = loadSprite("images/background/background.png");
var middlebackgroundImage = loadSprite("images/background/middleground.png");

// house
var housesImage = [
    loadSprite("images/background/tile000.png"),
    loadSprite("images/background/tile001.png"),
    loadSprite("images/background/tile002.png")
]

// ground
var groundImage = loadSprite("images/ground1.png");


// enemy
var enemyUrl = {
    idle: [
        "images/Skeleton/left/idle/tile000.png",
        "images/Skeleton/left/idle/tile001.png",
        "images/Skeleton/left/idle/tile002.png",
        "images/Skeleton/left/idle/tile003.png"
    ],
    walk: [
        "images/Skeleton/left/walk/tile000.png",
        "images/Skeleton/left/walk/tile001.png",
        "images/Skeleton/left/walk/tile002.png",
        "images/Skeleton/left/walk/tile003.png"
    ],
    strike: [
        "images/Skeleton/left/attack/tile000.png",
        "images/Skeleton/left/attack/tile001.png",
        "images/Skeleton/left/attack/tile002.png",
        "images/Skeleton/left/attack/tile003.png",
        "images/Skeleton/left/attack/tile004.png",
        "images/Skeleton/left/attack/tile005.png"
    ],
    death: [
        "images/Skeleton/left/death/tile000.png",
        "images/Skeleton/left/death/tile001.png",
        "images/Skeleton/left/death/tile002.png",
        "images/Skeleton/left/death/tile003.png"
    ]
}
var enemySprite = {
    idle: [],
    walk: [],
    strike: [],
    death: []
}

for (let i = 0; i < Object.keys(enemyUrl).length; i++) {
    enemyUrl[Object.keys(enemyUrl)[i]].forEach(e => {
        enemySprite[Object.keys(enemyUrl)[i]].push(loadSprite(e))
    });    
}
