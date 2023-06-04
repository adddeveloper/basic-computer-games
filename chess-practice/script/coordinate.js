var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
canvas.width = 8 * 50;
canvas.height = 8 * 50;
var holder = document.getElementById("holder");
var btn = document.querySelector(".btn");
var startmenu = document.getElementById("startmenu");
var instructions = document.getElementById("instructions");
var coordinate = document.getElementById("coordinate");
var points = 0;

btn.addEventListener("click", ()=>{
  toggler();
  coor();
})
var start = false;

function toggler(){
  // if(startmenu.classList.contains("d-none")){
    startmenu.classList.toggle("d-none");
    instructions.classList.toggle("d-none");
    console.log("done")
    start = true;
  // }
}

var blocksize = canvas.width / 8;
var board = [
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
];

board.forEach((e, y) => {
  e.forEach((f, x) => {
    if ((y + x) % 2 == 1) {
      context.fillStyle = 'green';
      context.fillRect(x * blocksize, y * blocksize, blocksize, blocksize);
    } else {
      context.fillStyle = 'white';
      context.fillRect(x * blocksize, y * blocksize, blocksize, blocksize);
    }
  });
});

board.forEach((e, y) => {
  e.forEach((f, x) => {
    if (y > 5 && f != ' ') {
      var img = document.createElement("img");
      img.src = "/pieces/white/" + f.toUpperCase() + '.png';
      img.onload = () => {
        context.drawImage(img, x * blocksize, y * blocksize, blocksize, blocksize);
      };
    } else if (y < 5 && f != ' ') {
      var img = document.createElement("img");
      img.src = "/pieces/black/" + f.toUpperCase() + '.png';
      img.onload = () => {
        context.drawImage(img, x * blocksize, y * blocksize, blocksize, blocksize);
      };
    }
  });
});

var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
var chosenc, clickedc;
function coor(){
  var rn = Math.floor(Math.random() * (letters.length - 0)) + 0;
  var rnt = Math.floor(Math.random() * (8 - 0)) + 0;
  var x = rn;
  var y = rnt;
  if(start){
    chosenc = letters[x] + String(8-y);
    coordinate.innerHTML = letters[x] + String(8-y);
  }
}
canvas.addEventListener('click', (e) => {
    var x = e.clientX - canvas.offsetLeft;
    var y = e.clientY - canvas.offsetTop;
    x = Math.floor(x/blocksize);
    y = Math.floor(y/blocksize);
    clickedc = letters[x] + String(8-y);
    if(clickedc == chosenc && start){
      coor();
    } else {
      start = false;
    }
});