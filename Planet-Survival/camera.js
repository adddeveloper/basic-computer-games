// camera.js

var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
var camera = {
    x: 0,
    y: 0,
    w: canvas.width,
    h: canvas.height,
    speed: 0
}
function cameraupdate(){
    if(camera.x+camera.speed < ((canvas.width*4) - (canvas.width*4)/2)){
        if((camera.x+camera.speed) >= 0){
            camera.x += camera.speed;
        }
    }
}