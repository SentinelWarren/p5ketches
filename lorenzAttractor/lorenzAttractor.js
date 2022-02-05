let x = 0.01;
let y = 0.0;
let z = 0.0;

const sigma = 10;
const rho = 28;
const beta = 8.0/3.0;

let points = [];
let angle = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  colorMode(HSB);
}

function draw() {
  background(0);
  let dt = 0.01;
  let dx = (sigma * (y - x)) * dt;
  let dy = (x * (rho - z) - y) * dt;
  let dz = (x * y - beta * z) * dt;
  x = x + dx;
  y = y + dy;
  z = z + dz;
  //vect = { x: x, y: y, z: z };
  
  points.push(new p5.Vector(x, y, z));
  //points.push(new p5.Vector(x, y, z));
  
  translate(0, 0, -80);
  //translate(width/2, height/2);
  scale(5);
  stroke(255);
  noFill();
  
  let hu = 0;
  
  beginShape();
  for(let v of points) {
    stroke(hu, 255, 255);
    vertex(v.x, v.y, v.z);
    //rotateX(angle);
    //rotateY(angle);
    //rotateZ(angle * 0.2);
    
    hu += 0.1;
    if (hu > 255) {
      hu = 0;
    }
    angle += 0.1;
    
  }
  endShape();
  

}
