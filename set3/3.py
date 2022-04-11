import turtle as t
import random
from PIL import Image
import os
import math


w = 700
h = 700
t.setup(w, h)

# Center vanishing point
CX = 0
CY = 0
        
def get_shadow(coord, d):
    t = math.atan2(coord[1]-CY, coord[0]-CX)
    return (d*math.cos(t)+coord[0], d*math.sin(t)+coord[1])


def main():
    # "hellt": 124
    seeds = [
        "LOL22",
        "lol22",
        'lol32',
        'hehe2'
    ]
    for seed in seeds:
        random.seed(seed)

        # Make turtle instant
        t.speed(0)
        t.delay(0)
        t.colormode(255)
        # t.ht()s
        # t.tracer(0, 0)

        t.penup()
        t.pensize(1)

        # Draw background fill
        t.color(227, 42, 30)
        t.goto(-w//2, h//2)
        t.pendown()
        t.begin_fill()
        t.goto(w//2, h//2)
        t.goto(w//2, -h//2)
        t.goto(-w//2, -h//2)
        t.goto(-w//2, h//2)
        t.end_fill()
        t.penup()

        # Draw shapes
        for i in range(40):
            xrange = 400
            yrange = 400
            x = random.random() * xrange - xrange//2 - 75
            y = random.random() * yrange - yrange//2 - 75
            a = max(random.random()*175, 120)
            b = max(random.random()*1.5, 0.6) * a
            d = max(random.random()*15, 10)

            draw_shape(x, y, a, b, d)

        # t.goto(CX, CY)
        # t.dot(20)

        # Save
        canvas_to_png()
        # t.done()
        t.clear()


def draw_shape(x, y, a, b, d):
    shift = random.random() * 100 - 50
    coords = [
        (x+a,y),
        (x+a+shift,y+b),
        (x+shift,y+b),
        (x,y)
    ]
    t.goto(x,y)
    t.fillcolor('white')
    t.pencolor('dark grey')
    t.begin_fill()
    t.pendown()
    for coord in coords:
        t.goto(coord)
    t.penup()
    t.end_fill()


    for i in range(random.choice([1, 3, 5])):
        # Draw inner shape
        x1 = random.random() * (coords[0][0] - coords[3][0]) + coords[3][0]
        x2 = random.random() * (coords[1][0] - coords[2][0]) + coords[2][0]
        t.goto(x1, coords[0][1])
        t.fillcolor(255, 249, 245)
        t.pencolor('dark grey')
        t.pendown()
        t.begin_fill()
        t.goto(coords[0])
        t.goto(coords[1])
        t.goto(x2, coords[1][1])
        t.goto(x1, coords[0][1])
        # t.penup()
        t.end_fill()

    # Draw shadow
    t.goto(get_shadow((x,y), d))
    t.pencolor('light grey')
    t.pendown()
    for coor in coords:
        t.goto(get_shadow(coor, d))
    # t.penup()

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
