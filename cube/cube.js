const capturer = new CCapture({
  framerate: 30,
  format: "png",
  name: "Cube",
  //workersPath: 'libraries/',
  quality: 100,
  verbose: true,
});

let p5Canvas;

let angle = 0;
let points = [];

const projection = [
  [1, 0, 0],
  [0, 1, 0]
];

function setup() {
  p5Canvas = createCanvas(600, 600, WEBGL);
  
  points[0] = createVector(-100, -100, -100);
  points[1] = createVector(100, -100, -100);
  points[2] = createVector(100, 100, -100);
  points[3] = createVector(-100, 100, -100);
  points[4] = createVector(-100, -100, 100);
  points[5] = createVector(100, -100, 100);
  points[6] = createVector(100, 100, 100);
  points[7] = createVector(-100, 100, 100);

}

function draw() {
  if (frameCount === 1) {
    capturer.start();
  }
  
  background(0);
  translate(0, 10);
  rotateY(angle);
  
  for (let v of points) {
    stroke(255);
    strokeWeight(16);
    noFill();
    point(v.x, v.y, v.z);
  }
  
  // Connecting
  for (let i = 0; i < 4; i++) {
    connect(i, (i + 1) % 4, points);
    connect(i+4, ((i + 1) % 4) + 4, points);
    connect(i, i + 4, points);
  }
  angle += 0.03;
  
  capturer.capture(p5Canvas.canvas);
  if (frameCount === 720) {
    noLoop();
    capturer.stop();
    capturer.save();
  }
}

function connect(i, j, points) {
  let a = points[i];
  let b = points[j];
  
  strokeWeight(1);
  stroke(255);
  line(a.x, a.y, a.z, b.x, b.y, b.z);
}
