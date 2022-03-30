import turtle as t
import random
from PIL import Image
import os


def main():


    # "hellt": 124
    seeds = [
        "LOL",
        "LOL2",
        "LOL3",
        "hellt"
    ]
    for seed in seeds:
        random.seed(seed)

            # Make turtle instant
        t.speed(0)
        t.delay(0)
        t.colormode(255)
        # t.ht()
        # t.tracer(0, 0)

        h = 700
        w = 700
        t.setup(w, h)
        t.penup()
        t.pensize(1)

        # Draw background fill
        # t.color(2, 2, 10)

        t.color(215, 230, 225)
        t.goto(-w//2, h//2)
        t.pendown()
        t.begin_fill()
        t.goto(w//2, h//2)
        t.goto(w//2, -h//2)
        t.goto(-w//2, -h//2)
        t.goto(-w//2, h//2)
        t.end_fill()
        t.penup()
        
        # Draw background shapes
        N = 10
        xs = [h*random.random()-h//2 for _ in range(N)]
        ys = [w*random.random()-w//2 for _ in range(N)]
        for i in range(N):
            t.goto(xs[i], ys[i])
            t.color(random.choice(DARK_BGCOLORS))
            t.begin_fill()
            size = max(random.random()*250, 40)
            t.right(90)
            t.forward(size)
            t.right(90)
            t.forward(size)
            t.right(90)
            t.forward(size)
            t.right(90)
            t.forward(size)
            t.right(90)
            t.end_fill()

        # Draw middle ground

        # Shooting stars
        N = 10
        xs = [h*random.random()-h//2 for _ in range(N)]
        ys = [w*random.random()-w//2 for _ in range(N)]
        t.pensize(0.01)
        for i in range(N):
            t.goto(xs[i], ys[i])
            t.color(int(120*random.random()), 101, int(115*random.random()))
            size = random.random()
            reverse = random.choice([0,1])
            reversed = False
            for j in range(int(-100*size*random.random()), int(100*size*random.random()), 1):
                y = -0.005*j**2 + 10
                t.goto(xs[i]+j, ys[i]+y)
                if reverse and not reversed:
                    t.dot(10*size)
                    reversed = True
                t.pendown()
            if not reversed:
                t.dot(10*size)
            t.penup()
        
        # Dots
        N = 5
        xs = [h*random.random()-h//2 for _ in range(N)]
        ys = [w*random.random()-w//2 for _ in range(N)]
        for i in range(N):
            for j in range(int(40*random.random())):
                t.color(int(100*random.random()),int(100*random.random()),int(100*random.random()))
                t.goto(xs[i]+random.random()*250-175,
                       ys[i]+random.random()*200-100)
                t.dot(random.random()*10)
                t.penup()



        # Draw main shapes
        t.pensize(1)
        N = 20
        xs = [random.random()*w*(i/N)*1.5-w//2 for i in range(N)]
        ys = [random.random()*h*(i/N)*1.5-h//2 for i in range(N)]
        rs = [max(random.random()*50, 10) for i in range(N)]
        bs = [random.random()*200 for i in range(N)]
        cs = [random.random()*3 for _ in range(N)]
        for i in range(N):
            shape1(xs[i], ys[i], r=rs[i], b=bs[i], c=cs[i])

        # Draw foreground
        N = 3
        xs = [h*random.random()-h//2 for _ in range(N)]
        ys = [w*random.random()-w//2 for _ in range(N)]
        t.pensize(0.01)
        t.penup()
        for i in range(N):
            t.goto(xs[i], ys[i])
            for j in range(int(40*random.random())):
                t.goto(xs[i]+random.random()*250-175,
                       ys[i]+random.random()*200-100)
                t.setheading(270)
                t.color(random.choice(LIGHT_BGCOLORS))
                t.pendown()
                t.forward(max(20, random.random()*100))
                if random.choice([0,1]):
                    t.dot(random.random()*2)
                t.penup()

        # Save
        canvas_to_png()
        t.clear()


COLORS = [
    (255, 136, 34),
    (210, 1, 17),
    (5, 29, 38),
    (139, 177, 116)
]

# Light BG Colors
LIGHT_BGCOLORS = [
    (232, 233, 235),
    (225, 225, 225),
    (239, 243, 240),
    (233, 225, 218),
    (224, 233, 230)
]

# Dark BG Colors
DARK_BGCOLORS = [
    (8, 1, 1),
    (12, 2, 2),
    (1, 5, 2),
    (4, 4, 20),
    (2, 2, 10),
]

def shape1(x, y, r=2, b=2, c=5):
    t.goto(x, y)
    t.left(random.random()*365)

    # color1 = (random.random(), random.random(), random.random())
    # color2 = (random.random(), random.random(), random.random())

    color1 = random.choice(COLORS)
    color2 = random.choice([c for c in COLORS if c != color1])
    color3 = random.choice(COLORS)

    # Get circle1 edges
    t.right(90)
    t.forward(r)
    # t.dot(10)
    coord1 = t.pos()
    t.right(180)
    t.forward(2*r)
    # t.dot(10)
    coord2 = t.pos()
    t.right(180)
    t.forward(r)
    t.left(90)

    t.forward(b)
    center2 = t.pos()
    # Get circle2 edges
    r2 = r*c

    t.right(90)
    t.forward(r2)
    # t.dot(10)
    coord3 = t.pos()
    t.right(180)
    t.forward(2*r2)
    # t.dot(10)
    coord4 = t.pos()
    t.right(180)
    t.forward(r2)

    # Connector lines
    # t.color(merge_RGB_colors(color1, color2))
    t.color(215, 230, 225)
    t.goto(coord2)
    t.pendown()
    t.begin_fill()
    t.goto(coord4)
    t.penup()
    t.goto(coord3)
    t.pendown()
    t.goto(coord1)
    t.end_fill()
    t.penup()

    # Draw circle 1
    t.goto(x, y-r)
    t.pendown()
    t.setheading(0)
    t.color(color1)
    t.begin_fill()
    t.circle(r)
    t.end_fill()
    t.penup()

    # Draw circle 2
    t.goto(center2[0], center2[1]-r2)
    t.setheading(0)
    t.pendown()
    t.color(color2)
    t.begin_fill()
    t.circle(r2, steps=200)
    t.end_fill()
    t.penup()

    # Dots line
    t.color(color3)
    t.setheading(90)
    t.forward(r2)
    t.pendown()
    t.dot(5)
    t.right(random.random()*360)
    t.forward(b*random.choice([1, 3])*random.random())
    t.dot(5)
    # t.penup()


def merge_RGB_colors(color1, color2, percent=0.5):
    r = color1[0] + percent * (color2[0] - color1[0])
    g = color1[1] + percent * (color2[1] - color1[1])
    b = color1[2] + percent * (color2[2] - color1[2])
    return (int(r), int(g), int(b))


def canvas_to_png():
    files = os.listdir()
    i = 0
    while True:
        name = str(i) + ".png"
        if name not in files:
            break
        i += 1
    t.ht()
    t.getscreen().getcanvas().postscript(file="temp.eps")
    Image.open("temp.eps").convert("RGB").save(
        name, subsampling=0, quality=100)
    os.remove("temp.eps")


if __name__ == "__main__":
    main()
