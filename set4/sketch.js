SCALE = 5
function setup() {
  W = 450 * SCALE;
  H = 450 * SCALE;
  createCanvas(W, H);
  angleMode(DEGREES);
  blendMode(ADD)
}

function draw() {
  scale(SCALE)
  translate(225, 225);
  noLoop();
  let space = 35;
  let rings = 24;
  fill(1, 2, 2);

  for (let i = 0; i < rings; i++) {
    rotate(random(-30, 50))
    let s = (space * i) / rings;
    w = 400 - i * s;
    h = 400 - i * s * 0.9;
    noStroke();
    ellipse(0, 0, w, h);

    density = 10000;

    w2 = w / 2;
    h2 = h / 2;
    d = 3.5;
    lastPoint = null;
    points = [];
    for (let i = -density / 2; i < density / 2; i++) {
      x = (w / density) * i;
      y = sqrt(h2 ** 2 - x ** 2 / (w2 / h2) ** 2);

      if (lastPoint) {
        if (dist(x, y, lastPoint[0], lastPoint[1]) < d) {
          continue;
        }
      }
      lastPoint = [x, y];
      points.push([x, y]);
    }
    rPoints = points.slice();
    rPoints.reverse();
    for (let p of rPoints) {
      points.push([p[0], -p[1]]);
    }
    shift = 35;
    m = 0.85;
    points2 = points.slice(shift).concat(points.slice(0, shift));
    osc = oscillate(10)
    
    diffColor = 0
    for (let i = 0; i < points.length; i++) {
      p1 = points[i];
      p2 = points2[i];
      if (diffColor) {
        diffColor -= 1
      } else {
        stroke(237, 237, 237, 100);
      }
      diff = 0.6 * osc.next().value
      strokeWeight((0.5 + diff * random()))
      if (random() > 0.95) {
        stroke(228, 237, 229, 150);
        diffColor = 5 * random()
      }
      line(p1[0], p1[1], p2[0] * m, p2[1] * m);
    }
  }
  fill(255, 255, 255)
  noStroke()
  // ellipse(0, 0, 150*0.9, 150)
  noFill()
  
  save("img.png")
}

function* oscillate(n) {
  while (true) {
    for (let i = -n; i < n; i++) {
      yield i / n
    }
    for (let i = n; i > -n; i--) {
      yield i / n
    }
  }
}
