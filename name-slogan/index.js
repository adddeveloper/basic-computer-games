var helpgotten_ = false;
var scorebb = document.getElementById("scorebutton");
var sss = 0;
var restartbb = document.getElementById("restartbutton");
var helpbb = document.getElementById("helpbutton");

var ddata__, ndata__ = [];
var img__ = document.getElementById("img__"); 

var option__ = document.querySelectorAll("#button__");
var x = 0;

fetch("slogan.json")
.then(res => res.json())
.then(data=>{
    ddata__ = data;
    newone();
});

function pointsystem(ss__){
    sss += ss__;
    scorebb.innerText = sss;
}

var nn, ww, nr = Math.floor(Math.random() * option__.length);
var oldwww = [];
function newone(){
    start();
    setTimeout(one, 2000);
    helpgotten_ = false;
    img__.innerText = '" '+ ddata__[x].slogan+' "';
    nn = Math.floor(Math.random() * option__.length);
    ndata__.push(ddata__.shift());
    
    option__.forEach((e, i)=>{
        if(nn == i){
            e.innerText = ndata__[ndata__.length-1].answer;
        } else if(nn != i){
            ww = Math.floor(Math.random() * ddata__.length);
            if(ww != nn){
                e.innerText = ddata__[ww].answer;
            }
        }
        
    });
}

option__.forEach(e=>{
    e.addEventListener("click", (eee)=>{
        console.log(
            eee.target.innerText, ndata__[ndata__.length-1].answer
        );  
        if(eee.target.innerText == ndata__[ndata__.length-1].answer){
            e.style.backgroundColor = "#00ff008c";
            setTimeout(() => {
                e.style.backgroundColor = "";
            }, 1000);
            pointsystem(1)
            setTimeout(() => {
                newone();
            }, 1000);
        } else if(eee.target.innerText != ndata__[ndata__.length-1].answer){
            e.classList.toggle("animate__headShake");
            e.style.backgroundColor = "#ff00008c";
            setTimeout(() => {
                e.style.backgroundColor = "";
                e.classList.toggle("animate__headShake");
            }, 1000);
            pointsystem(-0.25)
        }
    });
})

function restart__(){
    console.log("restart clicked.")
    if(ndata__[ndata__.length-1] != undefined){
        console.log("yes")
        ddata__.unshift(ndata__.pop());
        if(ndata__.length-1 > -1){
            console.log("yes")
            ddata__.unshift(ndata__.pop());
            pointsystem(-1);
            newone();
        } else if (ndata__.length-1 <= -1){
            console.log("no")
            ndata__.push(ddata__.shift());
        }
    }
}
restartbb.addEventListener("click", ()=>{restart__();});

var one_, two_;
var choices = [];

function help__() {
    if(!helpgotten_){
        helpgotten_ = true;
        choices = [];
        nr = Math.floor(Math.random() * option__.length);
        if(option__[nr].innerText == ndata__[ndata__.length-1].answer){
            helpgotten_ = false;
            help__();
        } else if(option__[nr].innerText != ndata__[ndata__.length-1].answer){
            helpgotten_ = true;
            pointsystem(-0.5)
            alert("Its either " + (option__[nr].innerText) +" or "+ ndata__[ndata__.length-1].answer + ".")
        }
    }
}
helpbb.addEventListener("click", ()=>{help__();});