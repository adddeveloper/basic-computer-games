var gameload = 0;
var playerUrl = [
    'images/player/player (1).png',
    'images/player/player (2).png',
    'images/player/player (3).png',
    'images/player/player (4).png',
    'images/player/player (5).png',
    'images/player/player (6).png',
    'images/player/player (7).png',
    'images/player/player (8).png',
    'images/player/player (9).png',
    'images/player/player (10).png',
    'images/player/player (11).png',
    'images/player/player (12).png',
    'images/player/player (13).png',
    'images/player/player (14).png',
    'images/player/player (15).png',
    'images/player/player (16).png',
    'images/player/player (17).png',
    'images/player/player (18).png',
    'images/player/player (19).png',
    'images/player/player (20).png'
];
var playerSprites = [];
var playeranimationframe = 0;
function loadsprite(x){
    const image = document.createElement("img");
    image.src = x;
    image.onload = ()=>{
        gameload++;
    }
    return image;
}
playerUrl.forEach(e=>{
    playerSprites.push(loadsprite(e));
})

function animateplayer(){
    context.beginPath();
    // context.fillRect(player.x, player.y, player.w, player.h);
    context.drawImage(playerSprites[playeranimationframe], player.x, player.y, player.w, player.h);
    context.closePath();
    playeranimationframe++;
    if(playeranimationframe >= playerSprites.length){
        playeranimationframe = 0;
    }
}

var obsticlesUrl = [
    'images/obsticles/obsticles (1).png',
    'images/obsticles/obsticles (2).png',
    'images/obsticles/obsticles (3).png',
    'images/obsticles/obsticles (4).png',
    'images/obsticles/obsticles (5).png',
    'images/obsticles/obsticles (6).png',
    'images/obsticles/obsticles (7).png',
    'images/obsticles/obsticles (8).png',
    'images/obsticles/obsticles (9).png',
    'images/obsticles/obsticles (10).png',
    'images/obsticles/obsticles (11).png',
    'images/obsticles/obsticles (12).png',
    'images/obsticles/obsticles (13).png',
    'images/obsticles/obsticles (14).png',
    'images/obsticles/obsticles (15).png',
    'images/obsticles/obsticles (16).png',
    'images/obsticles/obsticles (17).png',
    'images/obsticles/obsticles (18).png',
    'images/obsticles/obsticles (19).png',
    'images/obsticles/obsticles (20).png'
];
var obsticleanimationframe = 0;
var obsticleSprites = [];

obsticlesUrl.forEach(e=>{
    obsticleSprites.push(loadsprite(e));
})

function animateobstciles(){
    obsticles.forEach(e => {
        context.fillStyle = "red";
        context.beginPath();
        context.drawImage(obsticleSprites[obsticleanimationframe], e.x, e.y, e.w, e.h);
        context.closePath();
    })
    
    obsticleanimationframe++;
    if(obsticleanimationframe >= obsticleSprites.length){
        obsticleanimationframe = 0;
    }
}
