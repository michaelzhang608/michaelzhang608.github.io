W = 600;
H = 500;
function setup() {
  createCanvas(W - 100, H - 100);
  angleMode(DEGREES);
  blendMode(BLEND);

  lilyColors = [
    [color(102, 160, 165), color(112, 178, 113)],
    [color(40, 118, 126), color(49, 105, 112)],
  ];
}

function rose(x0, y0) {
  for (let j = 0; j < random(15,20); j++) {
    c = random([
      [color(197,128,181), 3],
      [color(198, 184, 210),10],
      [color(211, 195, 217), 20],
    ]);

    a = Array.from({ length: c[1] }, (p, i) => {
      x = i * 1;
      y = 0;

      return [x, y];
    });

    translate(x0, y0);
    rotate(-j * 11);
    paint(a, c[0], 0.9, 150, 0.92, 2);
    rotate(j * 11);
    translate(-x0, -y0);
  }
}

function mesh(x, y, w, h, density, c, size) {
  other = false;

  for (let i = 0; i < density; i++) {
    l = [];
    mvmt = [0, 0];
    for (let j = 0; j < density; j++) {
      mvmt[0] += random(-15, 15);
      mvmt[1] += random(-15, 15);
      l.push([
        mvmt[0] + x + (i * w) / density,
        mvmt[1] + y + (j * h) / density,
      ]);
    }
    if (other) {
      l.reverse();
    }
    x0 = l[0][0];
    y0 = l[0][1];

    paint(l, color(c.toString()), size, 100, 0.99, 2);

    other = !other;
  }
}

function lilyPad(x0, y0, cs) {
  a = Array.from({ length: 20 }, (x, i) => {
    x = x0 + i;
    y = y0 + sqrt(750 - i ** 2) + random(5);

    return [x, y];
  });
  paint(a, cs[0], 1.5, 100, 0.95, 1);
  paint(
    a.map((coord) => [coord[0], y0 - (coord[1] - y0) + 50]),
    cs[1],
    0.1,
    25,
    0.9,
    1
  );
}

function draw() {
  noLoop();
  background(118, 138, 195);


  
  mesh(0, 0, W, H, 80, color(25, 113, 161), 10);

  for (let i = 0; i < 8; i++) {
    mesh(
      -50 + i * 100 + random(20),
      -20,
      W / 6,
      random(H / 1.5, H - 100),
      25,
      color(236, 237, 228),
      3
    );
  }
  for (let i = 0; i < 8; i++) {
    mesh(
      -50 + i * 100 + random(20),
      random(H - H / 1.5, 100),
      W / 6,
      H,
      25,
      color(0, 58, 93),
      3
    );
  }
  
  
  for (let i = 0; i < 8; i++) {
    mesh(
      -50 + i * 100 + random(20),
      -20,
      W / 6,
      random(H / 1.5, H - 300),
      25,
      color(203, 193, 192),
      3
    );
  }
  for (let i = 0; i < 8; i++) {
    mesh(
      -50 + i * 100 + random(20),
      random(H - H / 1.5, 300),
      W / 6,
      H,
      25,
      color(93, 144, 193),
      3
    );
  }

  for (let i = 0; i < 40; i++) {
    lilyPad(20 + i * 15 + random(20), 300 + random(100), random(lilyColors));
  }
  for (let i = 0; i < 40; i++) {
    lilyPad(20 + i * 15 + random(20), 225 + random(100), random(lilyColors));
  }
    for (let i = 0; i < 8; i++) {
    mesh(
      -50 + i * 100 + random(20),
      -20,
      W / 6,
      random(H / 1.5, H - 300),
      10,
      color(203, 193, 192),
      3
    );
  }
  rose(150, 300);
  rose(175, 400);
  rose(100, 325);
  rose(300, 350);
  rose(250, 325);
  rose(400, 400);
    
  hangs(-10, -20, 20);
  hangs(320, -10, 40);

  for (let i = 0; i < 8; i++) {
    mesh(
      -50 + i * 100 + random(20),
      random(H - H / 1.5, 300),
      W / 6,
      H,
      10,
      color(93, 144, 193),
      3
    );
  }


}

function hangs(x0, y0, n) {
  for (let j = 0; j < n; j++) {
    // One hang
    x = x0 + 4 * j + random(15);
    y = y0 + random(30);
    loc = [x, y];
    c = random([color(9, 91, 89), color(8, 69, 39), color(50, 128, 71)]);
    for (let i = 0; i < randomGaussian(25, 20); i++) {
      direc = random([-1, 1]);
      a = Array.from({ length: random(5, 40) }, (x, i) => {
        x = loc[0] + (i * direc) / 4;
        y = loc[1] + (i / 4) ** (1.7 + random(0.1));
        return [x, y];
      });

      paint(a, c, 0.05 + random(0.025), 50, 0.95, 0.5);
      loc = a[a.length - 1];
      loc[0] += random(-1, 1);
      loc[1] -= random(1, 2);
    }
  }
}

SIZE = 3;
DOTS = 30;
SPREAD = 2.5;
DIRECTION = 0;

function paint(coords, c, size = SIZE, a = 150, r = 0.95, w = 2) {
  if (coords.length < 2) {
    throw "not enough coords";
  }
  // Set color
  c.setAlpha(a);
  stroke(c);
  strokeWeight(w);
  start = coords.shift(0);
  t = atan((coords[0][1] - start[1]) / (coords[0][0] - start[0]));
  splash(start, (t = t), (d = DOTS), (s = SPREAD * size));

  for (let i = 0; i < coords.length; i++) {
    v = 2;
    c.setRed(red(c) + random(-v, v));
    c.setGreen(green(c) + random(-v, v));
    c.setBlue(blue(c) + random(-v, v));
    coord = coords[i];
    // Set color
    c.setAlpha(alpha(c) * r);
    stroke(c);
    try {
      next = coords[i + 1];
      t = atan((next[1] - coord[1]) / (next[0] - coord[0]));
    } catch (e) {}
    splash(coord, (t = t), (d = DOTS), (s = SPREAD * size));
  }
}

function splash(coord, { d: DOTS, s: SPREAD, t: DIRECTION }) {
  translate(coord[0], coord[1]);
  rotate(t);
  for (let i = 0; i < d; i++) {
    point(randomGaussian(0, s), randomGaussian(0, s * 1.3));
  }
  rotate(-t);
  translate(-coord[0], -coord[1]);
}
