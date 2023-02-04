function playcoinsound(){
    const coinMusic = document.getElementById("coinMusic");
    coinMusic.volume = 0.5;
    coinMusic.currentTime = 0;
    coinMusic.play();
}
function landsound(){
    const bounceMusic = document.getElementById("bounceMusic");    
    bounceMusic.volume = 0.3;
    bounceMusic.currentTime = 0;
    bounceMusic.play();
}

var canvas = document.getElementById("canvas");
canvas.height = 600;
canvas.width = 600;
const context = canvas.getContext('2d');
var score = 0, ascore = 0;

var levels = [
    [
        ["-", " ", " ", "p", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"],
        ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"]
    ]
];
var currentLevel = 0;

function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// ---------------------- player ---------------------//
let player = {
    x: 0,
    y: 0,
    r: 20,
    sprite: document.getElementById("ball"),
    ratt: 0
}


function player1(x, y) {
    player.x = x;
    player.y = y;
    // context.fillRect( x, y+10, 40, 40);
    context.save();
    context.translate(player.x+20, player.y+10+20);
    context.rotate(player.ratt);
    // context.fillRect( x, y, canvas.width, canvas.height);
    context.translate(-player.x-20, -player.y-10-20);
    context.drawImage(player.sprite, x, y+10, 40, 40);
    context.fill();
    context.restore();
}


function coin(){
    if(ascore-score == 1){
        document.getElementById("miss").innerText = String(ascore-score)+" coin";
    } else if(ascore-score > 1 || ascore-score < 1){
        document.getElementById("miss").innerHTML = String(ascore-score)+" coins";
    } 
    if(score == 1){
        document.getElementById("collect").innerText = String(score)+" coin";
    } else if(score > 1 || score < 1){
        document.getElementById("collect").innerHTML = String(score)+" coins";
    } 
    var coinimage = document.getElementById("coin");
    var number = coinimage.src.split("/")[coinimage.src.split("/").length-1];
    number = number.split(".")[0];
    number = parseInt(number);
    if(number >= 7){
        number = 1;
    }else {
        number = number+1;
    }
    coinimage.src = "sprites/gold-coin/"+(number)+".png";
}

var gamehasstarted = true;
function start() {
    levels.forEach((e, i) => {
        if (i != currentLevel) return;
        e.forEach((x, ind) => {
            if (ind > 11) return;
            x.forEach((y, indx) => {
                if (y == "c") {
                    context.drawImage(document.getElementById("coin"),(indx) * 50, (ind) * 50 + 25, 25, 25);
                    
                    // context.fillRect();
                    context.fill();
                }
                // draw
                if (y == "b") {
                    context.fillRect((indx) * 50, (ind) * 50, 50, 25);
                    context.fill();
                }
                if (y == "p") {
                    player1((indx) * 50, (ind) * 50);
                }
            })
        })
    });
    if (!gamehasstarted) return;
    levels.forEach((e, i) => {
        if (i != currentLevel) return;
        e.forEach((x, ind) => {
            x.forEach((y, indx) => {
                if (((ind + 1) % 2) == 0) {
                    var hole = Math.ceil(Math.random() * ind);
                    if (x[hole] != "b" && x[hole] != "h" && x[hole] != "-" && x.filter(x => x == "h") == "") {
                        x[hole] = "h";
                    }
                    if (y != "b" && y != "h" && y != "p") {
                        x[indx] = "b";
                    }
                } else if (((ind + 1) % 2) == 1) {
                    var coin = Math.ceil(Math.random() * ind);
                    if (x[coin] != "b" && x[coin] != "h" && x[coin] != "-" && x.filter(x => x == "c") == "") {
                        x[coin] = "c";
                    }
                }
            })
        })
    });
    gamehasstarted = false;
}

function nextlevel() {
    var oldarr = ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"];
    var num12 = (oldarr.length-1)
    var coin = Math.ceil(Math.random() * num12);
    if (oldarr[coin] != "b" && oldarr[coin] != "h" && oldarr[coin] != "-" && oldarr.filter(oldarr => oldarr == "c") == "") {
        oldarr[coin] = "c";
    }
    levels[0].push(oldarr);
    var newarr = ["-", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "-"];
    var hole = Math.ceil(Math.random() * (10 - 0) + 0);
    if (newarr[hole] != "b" && newarr[hole] != "h" && newarr[hole] != "-" && newarr.filter(x => x == "h") == "") {
        newarr[hole] = "h";
    }
    newarr.forEach((y, i) => {
        if (y != "b" && y != "h" && y != "p") {
            newarr[i] = "b";
        }
    });
    levels[0].push(newarr);
}

function gravity() {
    try {
        var gra = levels[currentLevel][player.y / 50 + 1][player.x / 50];
        if (gra == "-" || gra == "b") return;
        if (gra == "c") {
            score++;
            ascore++;
            playcoinsound();
        }
        levels[currentLevel][(player.y / 50) + 1][(player.x / 50)] = levels[currentLevel][(player.y / 50)][(player.x / 50)];
        levels[currentLevel][(player.y / 50)][(player.x / 50)] = " ";
        if(levels[currentLevel][player.y/50+2][player.x/50] == "b"){
            landsound()
        }
        if (gra != "h") return;
        nextlevel();
    } catch (e) {
        console.log(e)
    }
}
setInterval(() => {
    gravity();
    coin();
}, 100);

// ------------------------- update -----------------//
function update() {
    if (levels[0][0].filter(x => x == "p") == "" && levels[0][0].filter(x => x == "c") != ""){
        ascore+=1;
    } 
    if (levels[0][0].filter(x => x == "p") == "") {
        levels[0].shift();
    }
    clear();
    start();
    requestAnimationFrame(update);
}

var gamestart = false;
var loading = true;
function gamesarts() {
    score = 0;
    var sprite = document.getElementById("ball");
    sprite.src = "sprites/circle/ball (" + Math.ceil(Math.random() * 50) + ").png";
    setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(document.getElementById("startbutton"), canvas.width / 2 - 50, canvas.height / 2 - 50, 100, 100);
        context.font = "42px comfortaa";
        context.fillStyle = '#000000';
        context.textAlign = "center";
        context.fillText("start", canvas.width / 2, canvas.height / 2 + 100);
        loading = false;
    }, 2000)
}

function one() {
    context.font = "42px comfortaa";
    context.fillStyle = '#000000';
    context.textAlign = "center";
    context.fillText("A game made by..", canvas.width / 2, canvas.height / 2);
    setTimeout(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = "42px comfortaa";
        context.fillStyle = '#000000';
        context.textAlign = "center";
        context.fillText("AdnansCode", canvas.width / 2, canvas.height / 2);

    }, 1000);
    gamesarts();
}
one();
// update();

canvas.addEventListener("click", () => {
    if (loading == true) return;
    if (gamestart == false) {
        gamestart = true;
        update();
        const bgMusic = document.getElementById("bgMusic");

        bgMusic.addEventListener("ended", function () {
            bgMusic.currentTime = 0;
            bgMusic.play();
        });
        bgMusic.volume = 0.7;
        bgMusic.play();
    }
});