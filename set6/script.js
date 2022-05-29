SCALE = 0.8
function setup() {
  let cnv = createCanvas(2000 * SCALE, 2000 * SCALE);
  angleMode(DEGREES);
  blendMode(ADD)
  background(0, 0, 0)

}


function draw() {
  scale(SCALE*0.6)
  translate(500, 500)
  noLoop()
  
  S = [600, 600]
  E = [900, 900]
  W = 800
  H = 800
  
  color1 = color(224, 108, 182)
  color2 = color(27, 58, 161)
  color3 = lerpColor(color1, color2, 0.5)
  color4 = color(125, 0, 80)
  color5 = color(143, 13, 22)
  color6 = color(176, 95, 101)
  color7 = color(188, 209, 214)
  
  noFill()
  for (let i = 0; i < 20000; i++) {
    
    c = [randomGaussian(0, W), randomGaussian(0, H)]
    a = atan2((c[1] - S[1]), (c[0] - S[0]))
    d = random(500)
    d2 = d * 0.5
    
    strokeWeight(randomGaussian(2))
    stroke(color1)
    point(c[0], c[1])
    
    strokeWeight(1)
    stroke(color2)
    point(c[0]+d*cos(a), c[1]+d*sin(a))
    
    strokeWeight(2)
    stroke(color3)
    point(c[0]+d2*cos(a), c[1]+d2*sin(a))
    
    colorx = color3
    colorx.setAlpha(200)
    stroke(colorx)
    strokeWeight(0.2)
    // line(c[0], c[1], c[0]+d*cos(a), c[1]+d*sin(a))
    bezier(c[0], c[1], c[0]+d*cos(a)*0.5, c[1]+d*sin(a)*0.5, c[0]+d*cos(a), c[1]+d*sin(a), random(c[0]+d*cos(a)), random(c[1]+d*sin(a)))
    
    
    c = [c[0]+d*cos(a), c[1]+d*sin(a)]
    a = atan2((c[1] - E[1]), (c[0] - E[0]))
    d = random(1000)
    // Moving to end
    strokeWeight(2)
    stroke(color6)
    point(c[0], c[1])
    
    strokeWeight(1)
    stroke(color7)
    point(c[0]+d*cos(a), c[1]+d*sin(a))

    
    strokeWeight(3)
    stroke(color4)
    point(c[0]+d2*cos(a), c[1]+d2*sin(a))


    colorx = color2
    colorx.setAlpha(200)
    stroke(colorx)
    strokeWeight(0.4)
    bezier(c[0], c[1], c[0]+d*cos(a)*0.5, c[1]+d*sin(a)*0.5, c[0]+d*cos(a), c[1]+d*sin(a), random(c[0]+d*cos(a)), c[1]+random(d*sin(a)))
    // line(c[0], c[1], c[0]+d*cos(a), c[1]+d*sin(a))
    

    

  }
  save("")
}
