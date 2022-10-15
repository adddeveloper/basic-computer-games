let clickS = 0;
function restart() {
    // window.location = "/Canvas Games/Break-Out Bricks";
    ball.ax =0;
    ball.ay =0;
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    score = 0;
    // reset
   en1 = {
      x: 40,
      y: 10,
      sizeW: 100,
      sizeH: 25,
    };
  
   en2 = {
      x: 40 + 140,
      y: 10,
      sizeW: 100,
      sizeH: 25,
    };
  
   en3 = {
      x: 40 + 280,
      y: 10,
      sizeW: 100,
      sizeH: 25,
    };
  
   en4 = {
      x: 40 + 420,
      y: 10,
      sizeW: 100,
      sizeH: 25,
    };
   en1bot = {
      x: 40,
      y: 50,
      sizeW: 100,
      sizeH: 25,
  };
  
   en2bot = {
      x: 40 + 140,
      y: 50,
      sizeW: 100,
      sizeH: 25,
  };
  
   en3bot = {
      x: 40 + 280,
      y: 50,
      sizeW: 100,
      sizeH: 25,
  };
  
   en4bot = {
      x: 40 + 420,
      y: 50,
      sizeW: 100,
      sizeH: 25,
  };
}
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

let person = {
    sizeW: 100,
    sizeH: 10,
    x: canvas.width / 2 - 50,
    y: canvas.height - 15,
    speed: 10,
    ax: 0,
    ay: 0,
};

function drawplayer() {
    ctx.fillRect(person["x"], person["y"], person["sizeW"], person["sizeH"]);
}

function playermove() {
    person.x += person.ax;
    person.y += person.ay;
    if (person.x - person.sizeW === canvas.width) {
        person.x = 0;
        return;
    }
    if (person.x + person.sizeW === 0) {
        person.x = canvas.width;
    }
}

// ---------------------- ball --------------//

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    ax: 0,
    ay: 0,
};

function startgame() {
    // ball.ax = 4;
    ball.ay = 7;
}

function drawball() {
    ctx.beginPath();
    ctx.arc(ball["x"], ball["y"], ball["size"], 0, Math.PI * 2);
    // stroke
    ctx.fillStyle = "black";
    ctx.fill();
}

function ballmove() {
    ball.y += ball.ay;
    ball.x += ball.ax;
    // document.addEventListener('mousemove', (e)=>{
    //   ball.x = e.clientX;
    //   ball.y = e.clientY;
    // });
    
    // detection Canvas + ball Y
    if (ball.y + ball.size > canvas.height) {
        restart();
        ball.ay *= -1;
    }
    if (ball.y - ball.size < 0) {
        ball.ay *= -1;
    }

    // detection Canvas + ball X
    if (ball.x + ball.size > canvas.width) {
        ball.ax *= -1;
    }
    if (ball.x - ball.size < 0) {
        ball.ax *= -1;
    }
}

//------------------------ detection -----------------//
function detection() {
    if (ball.x <= person.x + person.sizeW && ball.x + ball.size >= person.x && ball.y <= person.y + person.sizeH && ball.y + ball.size >= person.y) {
        ball.ay *= -1;
    }
}

// ---------------------- ball --------------//

let score = 0;
let HighScore = 0;
let store = localStorage.getItem("highscore");

let en1 = {
    x: 40,
    y: 10,
    sizeW: 100,
    sizeH: 25,
};

let en2 = {
    x: 40 + 140,
    y: 10,
    sizeW: 100,
    sizeH: 25,
};

let en3 = {
    x: 40 + 280,
    y: 10,
    sizeW: 100,
    sizeH: 25,
};

let en4 = {
    x: 40 + 420,
    y: 10,
    sizeW: 100,
    sizeH: 25,
};

function drawentop() {
    ctx.beginPath();
    ctx.fillRect(en1["x"], en1["y"], en1["sizeW"], en1["sizeH"]);
    ctx.fillRect(en2["x"], en2["y"], en2["sizeW"], en2["sizeH"]);
    ctx.fillRect(en3["x"], en3["y"], en3["sizeW"], en3["sizeH"]);
    ctx.fillRect(en4["x"], en4["y"], en4["sizeW"], en4["sizeH"]);
    ctx.fill();

    if (ball.x <= en1.x + en1.sizeW && ball.x + ball.size >= en1.x && ball.y <= en1.y + en1.sizeH && ball.y + ball.size >= en1.y) {
        en1 = "crash";
        score += 100;
        ball.ay *= -1;
    }

    if (ball.x <= en2.x + en2.sizeW && ball.x + ball.size >= en2.x && ball.y <= en2.y + en2.sizeH && ball.y + ball.size >= en2.y) {
        en2 = "crash";
        score += 100;
        ball.ay *= -1;
    }

    if (ball.x <= en3.x + en3.sizeW && ball.x + ball.size >= en3.x && ball.y <= en3.y + en3.sizeH && ball.y + ball.size >= en3.y) {
        en3 = "crash";
        score += 100;
        ball.ay *= -1;
    }
    if (ball.x <= en4.x + en4.sizeW && ball.x + ball.size >= en4.x && ball.y <= en4.y + en4.sizeH && ball.y + ball.size >= en4.y) {
        en4 = "crash";
        score += 100;
        ball.ay *= -1;
    }
}

let en1bot = {
    x: 40,
    y: 50,
    sizeW: 100,
    sizeH: 25,
};

let en2bot = {
    x: 40 + 140,
    y: 50,
    sizeW: 100,
    sizeH: 25,
};

let en3bot = {
    x: 40 + 280,
    y: 50,
    sizeW: 100,
    sizeH: 25,
};

let en4bot = {
    x: 40 + 420,
    y: 50,
    sizeW: 100,
    sizeH: 25,
};

function drawenbot() {
    ctx.beginPath();
    ctx.fillRect(en1bot["x"], en1bot["y"], en1bot["sizeW"], en1bot["sizeH"]);
    ctx.fillRect(en2bot["x"], en2bot["y"], en2bot["sizeW"], en2bot["sizeH"]);
    ctx.fillRect(en3bot["x"], en3bot["y"], en3bot["sizeW"], en3bot["sizeH"]);
    ctx.fillRect(en4bot["x"], en4bot["y"], en4bot["sizeW"], en4bot["sizeH"]);
    ctx.fill();

    if (ball.x <= en1bot.x + en1bot.sizeW && ball.x + ball.size >= en1bot.x && ball.y <= en1bot.y + en1bot.sizeH && ball.y + ball.size >= en1bot.y) {
        en1bot = "crash";
        score += 100;
        ball.ay *= -1;
    }

    if (ball.x <= en2bot.x + en2bot.sizeW && ball.x + ball.size >= en2bot.x && ball.y <= en2bot.y + en2bot.sizeH && ball.y + ball.size >= en2bot.y) {
        en2bot = "crash";
        score += 100;
        ball.ay *= -1;
        ball.ax = 5;
    }

    if (ball.x <= en3bot.x + en3bot.sizeW && ball.x + ball.size >= en3bot.x && ball.y <= en3bot.y + en3bot.sizeH && ball.y + ball.size >= en3bot.y) {
        en3bot = "crash";
        score += 100;
        ball.ay *= -1;
        ball.ax = 5;
    }
    if (ball.x <= en4bot.x + en4bot.sizeW && ball.x + ball.size >= en4bot.x && ball.y <= en4bot.y + en4bot.sizeH && ball.y + ball.size >= en4bot.y) {
        en4bot = "crash";
        score += 100;
        ball.ay *= -1;
    }
}
let snow = false;
function now(){
    if (localStorage.getItem("snow") == "true" || snow == "true"){
        document.getElementById('cookie').style.display ='none';
        snow = localStorage.getItem("snow");
        localStorage.setItem("snow", snow);
    }
    if(localStorage.setItem("snow", snow) == "false"){
        snow = false;
        document.getElementById('cookie').style.display ='flex';
    }
}

function scorenow() {
    if(en1 == "crash"&&en2 == "crash"&&en3 == "crash"&&en4 == "crash"&&
      en1bot == "crash"&&en2bot == "crash"&&en3bot == "crash"&&en4bot == "crash"){
      en1 = {
        x: 40,
        y: 10,
        sizeW: 100,
        sizeH: 25,
      };
      
      en2 = {
          x: 40 + 140,
          y: 10,
          sizeW: 100,
          sizeH: 25,
        };
      
      en3 = {
          x: 40 + 280,
          y: 10,
          sizeW: 100,
          sizeH: 25,
        };
      
      en4 = {
          x: 40 + 420,
          y: 10,
          sizeW: 100,
          sizeH: 25,
        };
      en1bot = {
          x: 40,
          y: 50,
          sizeW: 100,
          sizeH: 25,
      };
      
      en2bot = {
          x: 40 + 140,
          y: 50,
          sizeW: 100,
          sizeH: 25,
      };
      
      en3bot = {
          x: 40 + 280,
          y: 50,
          sizeW: 100,
          sizeH: 25,
      };
      
      en4bot = {
          x: 40 + 420,
          y: 50,
          sizeW: 100,
          sizeH: 25,
      };
    }
  
    document.getElementById("score").textContent = "Score: " + score;
    document.getElementById("highscore").textContent = "High-score: " + HighScore;
    if (HighScore < score) {
      HighScore = score;
     if (snow == "true"){
      localStorage.setItem("highscore", HighScore)
     }
    }
    if (HighScore < store) {
      HighScore = store;
    } else if(localStorage.getItem("highscore") > HighScore){
        HighScore = localStorage.getItem("highscore");
    }
}

// ---------------------- keybord ---------------------//
document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);

function moveright() {
    person.ax = person.speed;
}
function moveleft() {
    person.ax = -person.speed;
}

function keydown(e) {
    if (e.key === "d" || e.key === "ArrowRight") {
        moveright();
    } else if (e.key === "a" || e.key === "ArrowLeft") {
        moveleft();
    } else {
        return;
    }
}
function keyup(e) {
    if (e.key === "ArrowDown" || e.key === "d" || e.key === "ArrowRight" || e.key === "a" || e.key === "ArrowLeft") {
        person.ax = 0;
        person.ay = 0;
    }
}

// ------------------------- update -----------------//

function update() {
    clear();

    // player
    drawplayer();
    playermove();

    // ball
    drawball();
    ballmove();

    // detection
    detection();

    drawenbot();
    drawentop();

    scorenow();

    window.requestAnimationFrame(update);
}
update();
