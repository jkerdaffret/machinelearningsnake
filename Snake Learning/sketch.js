
let label = 'waiting...';
let classifier;
// let classifierclap

function preload() {
    classifier = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/H9fFpnLEC/model.json');
    // classifierclap = ml5.soundClassifier('https://teachablemachine.withgoogle.com/models/bIuphcYmX/model.json');
}

let snake;
let rez = 20;
let food;
let w;
let h;

function setup() {
  createCanvas(640, 480);
   classifyAudio();
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(1);
  snake = new Snake();
  foodLocation();
}

function classifyAudio() {
    classifier.classify(gotResults);
    // classifierclap.classify(gotResults);
}


function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function controlSnake() {
  if (label === 'gauche') {
    snake.setDir(-1, 0);
  } else if (label === 'droite') {
    snake.setDir(1, 0);
  } else if (label === 'bas') {
    snake.setDir(0, 1);
  } else if (label === 'haut') {
    snake.setDir(0, -1);
  }
}

function draw() {
    background(220);
    textSize(32);
    fill(0);
    text(label, 10, 50);

  scale(rez);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    print('END GAME');
    background(255, 0, 0);
    noLoop();
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    } else {
        // console.log(`${results[0].label}`);
        label = results[0].label
        controlSnake();
    }
}