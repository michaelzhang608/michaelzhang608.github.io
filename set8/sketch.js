BG_COLOR = "#f0ece4"

COLORS = [
  "#cb4b02",
  "#fec64b",
  "#fc741c",

  "#e19f2d",
  "#da831a",
  "#230804",


  "#599662",
  "#0f291d",
  "#2d453f",

  "#2d453f",
  "#3e2b24",
  "#a0b474",

  "#a0b474",
  "#649969",
  "#993a0c",

  "#575c6b",
  "#d54a22",            
  
]


CANVAS_WIDTH = 1000
CANVAS_HEIGHT = 1000

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  angleMode(DEGREES);
}

function draw() {
  noLoop()
  background(BG_COLOR);

  rows_cols = 30
  beetle_size = 11
  for (let x = 0; x < rows_cols; x++) {
    for (let y = 0; y < rows_cols; y++) {
      beetle(x * CANVAS_WIDTH / rows_cols + beetle_size*1.5,
             y * CANVAS_HEIGHT / rows_cols + beetle_size*1.5,
             beetle_size * random(0.9, 1.2),
             [
        random(COLORS),
        random(COLORS),
        random(COLORS),
        random(COLORS)
      ])
    }
  }
}

function beetle(x,y,s, colors) {
  r=s
  
  stroke(colors[3])
  strokeWeight(s/50*2.5)
  // Leg 1
  x1 = x + s * 0.45
  y1 = y - s * 0.2
  x2 = x1 + s * 0.2
  y2 = y1 - s * 0.5
  bezier(x1, y1, x1+s*0.2, y1-s*0.2, x2, y2, x2, y2)

  // Leg 2
  x1 = x - s * 0.45
  y1 = y - s * 0.2
  x2 = x1 - s * 0.2
  y2 = y1 - s * 0.5
  bezier(x1, y1, x1-s*0.2, y1-s*0.2, x2, y2, x2, y2)
  
  // Leg 3
  x1 = x - s * 0.4
  y1 = y + s * 0.2
  x2 = x1 - s * 0.3
  y2 = y1 - s * 0.2
  bezier(x1, y1, x1-s*0.2, y1-s*0.2, x2, y2, x2, y2)

  // Leg 4
  x1 = x + s * 0.4
  y1 = y + s * 0.2
  x2 = x1 + s * 0.3
  y2 = y1 - s * 0.2
  bezier(x1, y1, x1+s*0.2, y1-s*0.2, x2, y2, x2, y2)
  
  // Leg 5
  x1 = x - s * 0.35
  y1 = y + s * 0.45
  x2 = x1 - s * 0.3
  y2 = y1 + s * 0.3
  bezier(x1, y1, x1+s*0.2, y1-s*0.2, x2, y2, x2, y2)

  // Leg 6
  x1 = x + s * 0.35
  y1 = y + s * 0.45
  x2 = x1 + s * 0.3
  y2 = y1 + s * 0.3
  bezier(x1, y1, x1-s*0.2, y1-s*0.2, x2, y2, x2, y2)

  
  // Abdomen
  w = s
  h = s * random(0.9, 1.4)
  start = 40 + 270
  stop = -40 + 270
  noStroke()
  fill(colors[0])
  arc(x,y+r*0.2,w,h,start,stop,mode=OPEN)
  
  // Abdomen cutout
  m = s / 50
  x1 = x
  y1 = y - 5 * m
  x2 = x - 30 * m
  y2 = y1 - 20 * m
  x3 = x + 30 * m
  y3 = y1 - 20 * m
  fill(BG_COLOR)
  noStroke()
  triangle(x1, y1, x2, y2, x3, y3) 
  
  // Abdomen split
  strokeWeight(s/50*2.5)
  stroke(BG_COLOR)
  line(x1, y1, x, y + s)
  
  // Thorax
  m = 0.65
  x1 = x
  y1 = y - s * 0.8 * m
  w = s * m
  h = s * m
  start = 70 + 90
  stop = -70 + 90
  fill(colors[2])
  noStroke()
  arc(x1,y1,w,h,start,stop,mode=CHORD)
  
  // Antennae
  noFill()
  stroke(colors[1])
  strokeWeight(s/50*2.5)
  antennae_length = random(0.2, 0.5)
  // Antenna
  x1 = x - s * 0.20
  y1 = y - s * 0.7
  x2 = x1 - s * 0.1
  y2 = y1 - s * antennae_length
  bezier(x1, y1, x1-s*0.2, y1-s*0.2, x2, y2, x2, y2)
  strokeWeight(s/50*6)
  point(x2, y2)
  strokeWeight(s/50*2.5)
  x1 = x + s * 0.20
  y1 = y - s * 0.7
  x2 = x1 + s * 0.1
  y2 = y1 - s * antennae_length
  bezier(x1, y1, x1+s*0.2, y1-s*0.2, x2, y2, x2, y2)
  strokeWeight(s/50*6)
  point(x2, y2)

  
}