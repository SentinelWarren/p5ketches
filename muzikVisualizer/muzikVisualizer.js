let song;
let fft;

function preload() {
  //song = loadSound("songs/davinci_codes_remix.mp3");
  song = loadSound("songs/nitumie_link.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  fft = new p5.FFT();
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  
  translate(width / 2, height / 2);
  
  let wave = fft.waveform();
  
  for (let t = -1; t <= 1; t += 2) {
    beginShape();
    for (let i = 0; i <= 180; i += 0.5) {
      let index = floor(map(i, 0, 180, 0, wave.length - 1));
    
      let radi = map(wave[index], -1, 1, 150, 350);
      let x = radi * sin(i) * t;
      let y = radi * cos(i);
      vertex(x, y);
    }
    endShape();
  }

}

function mouseClicked() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
  }
}
