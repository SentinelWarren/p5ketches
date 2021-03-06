// const capturer = new CCapture({
//   framerate: 30,
//   format: "png",
//   name: "3dTerrain",
//   //workersPath: 'libraries/',
//   quality: 100,
//   verbose: true,
// });

//let p5Canvas;

let cols;
let rows;
let scl = 20;
let w = 2200; 
let h = 1800;

let flying = 0;
let terrain = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = w / scl;
  rows = h / scl;
  
  for (let x = 0; x < cols; x++) {
    terrain[x] = [];
    for (let y = 0; y < rows; y++) {
      terrain[x][y] = 0; //specify a default value for now
    }
  }
}

function draw() {
  // if (frameCount === 1) {
  //   capturer.start();
  // }
  
  flying -= 0.315;
  let yOff = flying;
  for (let y = 0; y < rows; y++) {
    let xOff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xOff,yOff), 0, 1, -100, 100);
      xOff += 0.2;
    }
    yOff += 0.2;
  }

  // background(0);
  // stroke(255);
  background(240, 255, 255);
  stroke(3, 180, 98);
  fill(80, 55, 21, 215);
  //noFill();
  
  translate(0, 50);
  rotateX(PI/3);
  //translate(width/2+50, height/2+50);
  //rotateZ(PI/3);
  translate(-w/2, -h/2);
  
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }
  
  // capturer.capture(p5Canvas.canvas);
  // if (frameCount === 500) {
  //   noLoop();
  //   capturer.stop();
  //   capturer.save();
  // }
}
