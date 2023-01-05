var right__ = document.getElementById("right__"),
wrong__ = document.getElementById("wrong__"),
contentholder__ = document.getElementById("contentholder__");
var score__ = document.getElementById("score__");

var ddata__;
var optionOne = document.getElementById("OptionOne__"),
optionTwo = document.getElementById("OptionTwo__"),
optionThree = document.getElementById("OptionThree__"),
optionFour = document.getElementById("OptionFour__"),
img__ = document.getElementById("img__"); 

var alloption = [optionOne, optionTwo, optionThree, optionFour];
var x = 0, s = 0;

fetch("logo.json")
.then(res => res.json())
.then(data=>{
    ddata__ = data;
    newone();
});

function remove__(r) {
    r = r.replace("-", " ");
    r = r.replace("-", " ");
    r = r.replace("-", " ");
    r = r.replace("logo", "");
    r = r.replace(".png", "");
    r = r.replace(".png", "");
    r = r.replace(".png", "");
    return r;
}

function newone(){
    img__.src = "images/" + ddata__[x];
    var nn = Math.floor(Math.random() * alloption.length);
    alloption[nn].innerHTML = remove__(ddata__[x]);
    alloption.forEach((e, i)=>{
        if(i != nn){
            e.innerHTML = remove__(ddata__[Math.floor(Math.random() * ddata__.length)]);
        }
    });

    score__.innerHTML = String(s);
}

alloption.forEach((e)=>{
    e.addEventListener("click", ()=>{
        if(e.innerHTML != remove__(ddata__[x])){
            console.log("wrong ", x);
            x++;
            newone();
        } else{
            console.log("right ", x);
            x++;
            s++;
            if(x>99){
                alert("congrats!!!")
                x = 0;
                window.location.reload();
            } else {
                newone();
            }
        }
    })
});