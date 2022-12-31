WIGGLE = 0
function setup() {
  createCanvas(800, 600);
  angleMode(DEGREES);


  slider = createSlider(0, 255, 100);
  randomSeed(slider.value())
  slider.position(10, 10);
  slider.style('width', '80px');
  slider.changed(function(){
    randomSeed(this.value())
    console.log(this.value())
    background('white')
    drawingContext.restore()
    clear()
    redraw()
  })

}

COLORS = [
  '#ffffff',
  '#95c3da',
  '#262825',
  '#D19838',
  '#E4E143',
  '#b03f47'
]

function draw() {
  
  noLoop()
  drawingContext.save()
  W = width
  H = height
  
  // Background shape
  beginShape()
  fill('#b03f47')
  noStroke()
  setWiggle(0.025)
  x1 = W*r1(0.1)
  y1 = H*r1(0.1)
  vertex(x1, y1)
  vertex(W*r1(0.9), H*r1(0.1))
  vertex(W*r1(0.9), H*r1(0.9))
  vertex(W*r1(0.1), H*r1(0.9))
  vertex(x1, y1)
  endShape()
  drawingContext.clip()
  
  nx = 10
  ny = 5
  polygons = []
  for (let x = 0; x < nx; x++) {
    for (let y = 0; y < ny; y++) {
      polygons.push([random(5,20), random(20,50), x * W / nx, y * H / ny, polygon])
    }
  }
  
  nx = 20
  ny = 20
  for (let x = 0; x < nx; x++) {
    for (let y = 0; y < ny; y++) {
      polygons.push([random(1.5), random(50), x * W / nx, y * H / ny, bar])
    }
  }
  
  while (polygons.length) {
    i = int(random(0, polygons.length - 1))
    p = polygons[i]
    polygons.splice(i, 1)
    fill(random(COLORS))
    noiseSeed(random())
    f = p[4]
    f(p[0], p[1], p[2], p[3])
  }

  granulate(5)
}


function polygon(n, s, x0, y0) {
  translate(x0, y0)
  beginShape()
  xs = 0
  ys = 0
  t = 0
  for (let i = 0; i < n; i++) {
    r = noise(0.4*i) * s
    t += noise(0.01*i + 100) * 360 / n * 2
    if (i==0) {
      xs = r*cos(t)
      ys = r*sin(t)
    }
    if (t > 360) {
      break
    }
    vertex(r*cos(t), r*sin(t))
  }
  vertex(xs, ys)
  endShape()
  translate(-x0, -y0)
}

function bar(d, s, x0, y0) {
  translate(x0, y0)
  beginShape()
  
  vertex(-s*d, -s)
  vertex(-s*d, s)
  vertex(s*d, s)
  vertex(s*d,-s)
  vertex(-s*d, -s)

  endShape()
  translate(-x0, -y0)
}
  
function setWiggle(n) {
  WIGGLE = n
}

function r1(n) {
  return n+random(-WIGGLE, WIGGLE)
}

function granulate(amount) {
    loadPixels();
    const d = pixelDensity();
    const pixelsCount = 4 * (width * d) * (height * d);
    for (let i = 0; i < pixelsCount; i += 4) {
        const grainAmount = random(-amount, amount);
        pixels[i] = pixels[i] + grainAmount;
        pixels[i+1] = pixels[i+1] + grainAmount;
        pixels[i+2] = pixels[i+2] + grainAmount;
        // comment in, if you want to granulate the alpha value
        // pixels[i+3] = pixels[i+3] + grainAmount;
    }
    updatePixels();
}