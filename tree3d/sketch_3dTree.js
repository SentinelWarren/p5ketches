const capturer = new CCapture({
  framerate: 5,
  format: "gif",
  name: "3dTree",
  workersPath: 'libraries/',
  quality: 100,
  verbose: true,
});

let p5Canvas;

function setup(){
  //createCanvas(windowWidth, windowHeight, WEBGL);
  p5Canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  frameRate(5);
  
  //noLoop();
}

function draw() {
  if (frameCount === 1) {
    capturer.start();
  }
  background(200);
  
  randomSeed(1);
  
  translate(0, 200, 0);
  
  rotateY(frameCount);
  
  branch(150);
  
  capturer.capture(p5Canvas.canvas);
  if (frameCount === 64) {
    noLoop();
    capturer.stop();
    capturer.save();
  }
  
  //save("3dtree.png");
}

function branch(len) {
  strokeWeight(map(len, 10, 100, 0.5, 5));
  stroke(70, 40, 20);
  
  line(0, 0, 0, 0, -len - 2, 0);
  
  translate(0, -len, 0);
  
  if (len > 10) {
    for (let i = 0; i < 3; i++) {
      rotateY(random(100, 140));
      
      push();
      
      rotateZ(random(20, 50));
      branch(len * 0.7);

      pop();
    }
  } else {
    
    let red = 167 + random(-20, 20);
    let green = 159 + random(-20, 20);
    let blue = 15 + random(-20, 20);
    
    fill(red, green, blue, 200);
    noStroke();
    
    translate(5, 0, 0);
    
    rotateZ(90);
    
    beginShape();
    for (let i = 45; i < 135; i++) {
      let rad = 7;
      let x = rad * cos(i);
      let y = rad * sin(i);
      vertex(x, y);
    }
    
    for (let i = 135; i > 45; i--) {
      let rad = 7;
      let x = rad * cos(i);
      let y = rad * sin(-i) + 10;
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
