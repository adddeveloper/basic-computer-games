var timeNumb = document.getElementById("timeNumb");
timeNumb.parentElement.innerHTML ="";
var endfinish = document.getElementById("endfinish");
endfinish.innerHTML="";
var ddata=[], cdata=[], tdata=[];
var clik = [];
var currentpoint=0, currentrounds = 7;
var deck = document.getElementById("deck");
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var startMenu = document.querySelector(".startMenu");
var startButton = document.querySelector("#startButton");
var loader = document.querySelectorAll(".loader");
var body = document.querySelectorAll(".body");
var endMenu = document.querySelector(".endMenu");
var endButton = document.querySelector("#endButton");

fetch("cards.json")
.then(res=>res.json())
.then(data=>{
    ddata = data;
});

function startTheGame() {
    currentpoint = 0;
    deck.innerHTML = "";
    var num = tdata.length;
    for (let i = 0; i < num; i++) {
        ddata.push(tdata.pop());
    }

    for (let i = 0; i < currentrounds; i++) {
        var rc = Math.floor(Math.random() * ddata.length);
        tdata.push(ddata.splice(rc, 1)[0]);
    }

    cdata=[];
    cdata = tdata;

    // var cdatatwo = cdata;
    cdata = cdata.concat(cdata);
    cdata.sort(() => Math.random() + 0.5);
    cdata.sort(() => Math.random() + 1);
    cdata.sort(() => Math.random() - 0.5);
    cdata.sort(() => Math.random() - 1);
    deck.innerHTML='';
    cdata.forEach((e, i)=>{
        // deck.innerHTML += '<img onclick="csee(\'card_'+i+'\')" id="card_'+i+'" src="'+e.url+'" class="card" alt="'+e.url+'">';
        deck.innerHTML += '<img onclick="csee(\'card_'+i+'\')" id="card_'+i+'" src="deck/back-1.png" class="card" alt="'+e.url+'">';
    });
}

// restart everything
function start() {
    loader.forEach((e, i) => {
        if (i == 0) {
            e.classList.remove("hidden");
        } else if (i == 1) {
            e.classList.add("hidden");
        }
    });
    body.forEach((e) => {
        e.classList.add("hidden");
    });
    startMenu.classList.add("hidden");
    endMenu.classList.add("hidden");
}
// main game
function game__(num) {
    if(num == 1){
        // start the game
        loader.forEach((e, i) => {
            e.classList.add("hidden");
            if (i == 1) {
                e.children[0].classList.remove("animate__pulse");
            }
        });
        body.forEach((e) => {
            e.classList.remove("hidden");
        });
        startMenu.classList.add("hidden");
        endMenu.classList.add("hidden");
        startTheGame()
    } else if(num == 2){
        // end the game
        loader.forEach((e, i) => {
            e.classList.add("hidden");
            if (i == 1) {
                e.children[0].classList.remove("animate__pulse");
            }
        });
        body.forEach((e) => {
            e.classList.add("hidden");
        });
        startMenu.classList.add("hidden");
        endMenu.classList.remove("hidden");
    }
    // view score
    // timeNumb.innerHTML = currentpoint +" - "+ currentrounds;
}
// game
function csee(id){
    // view score
    // timeNumb.innerHTML = currentpoint + " - " + currentrounds;
    var card___ = document.getElementById(id);
    if (clik.length < 2) {
        card___.src = card___.alt;
    }
    if (clik.length == 0) {
        clik.push([card___.alt, card___.id]);
    } else if (clik.length >= 2) {
        clik.forEach((el) => {
            document.getElementById(el[1]).src = "deck/back-1.png";
        });
        clik = [];
        card___.src = "deck/back-1.png";
    } else if (clik.length < 2) {
        if (clik[0][1] != card___.id && clik[0][0] != card___.alt) {
            // if wrong pair of cards are clicked
            setTimeout(() => {
                clik.forEach((el) => {
                    document.getElementById(el[1]).src = "deck/back-1.png";
                })
                clik = [];
                card___.src = "deck/back-1.png";
            }, 1000);
        } else if (clik[0][1] != card___.id && clik[0][0] == card___.alt) {
            // if right pair of cards are clicked
            clik.push([card___.alt, card___.id]);
            setTimeout(() => {
                clik.forEach((e) => {
                    document.getElementById(e[1]).style.display = "none";
                    currentpoint += 0.5;
                });
                clik = [];
                if (currentpoint == currentrounds) {
                    game__(2);
                }
            }, 1000);
        }
    }
}
// main menu
function one(it) {
    if (it == 1) {
        loader.forEach((e) => {
            e.classList.add("hidden");
        });
        startMenu.classList.remove("hidden");
    }
    // startButton.click();
}

window.addEventListener("load", function () {
    start();
    setTimeout(()=>{one(1)}, 1000);
});

startButton.addEventListener("click", ()=>{
    game__(1);
});
endButton.addEventListener("click", ()=>{
    game__(1);
});



/*

start   -->   game   -->   end   --
                ^                 |
                |_________________|

*/
