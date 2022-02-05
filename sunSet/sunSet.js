const capturer = new CCapture({
  framerate: 15,
  format: "png",
  name: "sunSet",
  //workersPath: 'libraries/',
  quality: 100,
  verbose: true,
});

let p5Canvas;

let canvasSize = 600;
let halfCanvasSize = canvasSize * 0.5;
let sunHeight = 120;
let sunSize = canvasSize * 0.235;
let gradientSteps = 10;

let noiseScale = 0.037;
let waveMovementSpeed = 2.7;

let waterStrokeWeight = 6.5;
let waterStride = 13.25;

function setup() {
  p5Canvas = createCanvas(canvasSize, canvasSize);
  background(100);
  noStroke();

  // sky background
  fill(50, 90, 100);
  rect(0, 0, canvasSize, canvasSize);

  // sky burst
  let from = color(69, 103, 108);
  let to = color(240, 220, 180);
  for (let i = gradientSteps; i > 0; --i) {
    let size = map(i, gradientSteps, 0, canvasSize + 50, halfCanvasSize);
    fill(lerpColor(from, to, 1 - i / gradientSteps));
    ellipse(halfCanvasSize, sunHeight, size, size);
  }

  // horizon fades
  from = color(210, 140, 100, 30);
  to = color(85, 40, 50, 30);
  for (let i = gradientSteps; i > 0; --i) {
    let sizeX = map(i, gradientSteps, 0, canvasSize, halfCanvasSize);
    let sizeY = map(i, gradientSteps, 0, canvasSize * 0.3, 20);
    let posOffset = map(i, gradientSteps, 0, halfCanvasSize, halfCanvasSize + 50);
    fill(lerpColor(from, to, 1 - i / gradientSteps));
    ellipse(halfCanvasSize - posOffset, sunHeight, sizeX, sizeY);
    ellipse(halfCanvasSize + posOffset, sunHeight, sizeX, sizeY);
  }

  // sun
  from = color(255, 245, 200);
  to = color(255, 255, 250);
  for (let i = gradientSteps; i > 0; --i) {
    let size = map(i, gradientSteps, 0, sunSize, 0);
    fill(lerpColor(from, to, 1 - i / gradientSteps));
    ellipse(halfCanvasSize, sunHeight, size, size);
  }
  
  // setup for the water line drawing
  strokeWeight(waterStrokeWeight);
}

function draw() {
  if (frameCount === 1) {
    capturer.start();
  }
  
  // water and reflection coloration based on perlin noise
  let lineToggle = 0;
  let reflectionHalfWidth = sunSize;
  let reflectionColor = color(245, 130, 130);
  let highlightColor = color(240, 240, 179);
  let waterLowColor = color(0, 11, 35.95);
  let waterHighColor = color(100, 110, 145);
  let noiseZInput = frameCount / 100 * waveMovementSpeed;
  
  for (let yPos = sunHeight + waterStrokeWeight; yPos < height + waterStrokeWeight; yPos += waterStrokeWeight) {
    let yPosMap01 = map(yPos, sunHeight, height, 0, 1);
    let noiseYInput = noiseScale * (yPos * map(yPos, sunHeight, height, 1.5, 1) - frameCount / 3) * waveMovementSpeed;
    
    for (let xPos = lineToggle; xPos <= width - lineToggle; xPos += waterStride) {
      let noiseXInput = noiseScale * ((xPos - (1 - yPosMap01) * halfCanvasSize / 2) + waterStride * 0.5) / (yPosMap01 * 10 + 1);
      let noiseVal = noise(noiseXInput, noiseYInput, noiseZInput);
      let noiseValIncreasedContrast = constrain(map(noiseVal, 0.1, 0.6, 0, 1), 0, 1);
      let edgeBlendModifier = constrain((2 - (abs(halfCanvasSize - xPos + lineToggle) / (reflectionHalfWidth * (yPosMap01 + 0.6))) * 2), 0, 1);
      
      // base water color
      let c = lerpColor(waterLowColor, waterHighColor, noiseVal);
      // primary reflection color within the center region
      c = lerpColor(c, reflectionColor, constrain(noiseValIncreasedContrast * 4 - 3, 0, edgeBlendModifier));
      // secondary highlight color (with added emphasis just below the sun)
      c = lerpColor(c, highlightColor, constrain((noiseVal * 10 - 6), 0, edgeBlendModifier) + pow(1 - yPosMap01, 8) * edgeBlendModifier * 1.5);
      // random highlights in the waves outside of the center region
      c = lerpColor(c, highlightColor, constrain((noiseVal * 10 - 7), 0, 1));

      // draw the line segment
      stroke(c);
      line(xPos, yPos, xPos + waterStride, yPos);
    }
    // alternate each row to add variety
    lineToggle = lineToggle == 0 ? -waterStride / 2 : 0;
  }
  
  capturer.capture(p5Canvas.canvas);
  if (frameCount === 120) {
    noLoop();
    capturer.stop();
    capturer.save();
  }
}
