// ---------------------- keybord ---------------------//
document.addEventListener("keydown", keydown);
function moveleft() {
    player.ratt -= Math.PI/180*50;
    var mvln = levels[currentLevel][player.y/50][player.x/50-1];
    if((player.x/50) <= 0|| mvln == "b") return;
    if( mvln == "c"){
        score++;
        ascore++;
        playcoinsound()
    }
    levels[currentLevel][player.y/50][player.x/50-1] = levels[currentLevel][player.y/50][player.x/50];
    levels[currentLevel][player.y/50][player.x/50] = " ";
}


function moveright() {
    player.ratt += Math.PI/180*50;
    var mvrn = levels[currentLevel][player.y/50][player.x/50+1];
    if(player.x/50+1 == levels[currentLevel][player.y/50].length|| mvrn == "b") return;
    if( mvrn == "c"){
        score++;
        ascore++;
        playcoinsound();
    }
    levels[currentLevel][player.y/50][player.x/50+1] = levels[currentLevel][player.y/50][player.x/50];
    levels[currentLevel][player.y/50][player.x/50] = " ";
}
function keydown(e) {
    if (e.key === "a" || e.key === "ArrowLeft") {
        moveleft();
        e.preventDefault();
    } 
    if (e.key === "d" || e.key === "ArrowRight") {
        moveright();
        e.preventDefault();
    }
    return;
}

function windowsizechecker(){
    if(window.innerWidth >= 700){
    document.getElementById("controller").classList.add("d-none");
    }
}
windowsizechecker();
window.addEventListener("resize", windowsizechecker);
window.addEventListener("load", windowsizechecker);

var left_ = document.getElementById("left_");
var right_ = document.getElementById("right_");
// hold down
left_.addEventListener("touchstart", ()=>{
    moveleft();
});
right_.addEventListener("touchstart", ()=>{
    moveright();
});
// click
// left_.addEventListener("click", ()=>{
//     moveleft();
// });
// right_.addEventListener("click", ()=>{
//     moveright();
// });