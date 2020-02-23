let frameCount = 0

function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  background(0)
  ++frameCount
  stroke(50)
  for (y = -100; y <= windowHeight * 1.5; y += 10) {
    noFill()
    beginShape()
    for (x = -100; x <= windowWidth * 1.5; x += 35) {
      curveVertex(x, y + 250 * noise(x / 50 + frameCount / 900 + y / 500))
    }
    endShape()
  }
}
