import turtle as t
import random
from PIL import Image
import os

def fib():
    n1 = 1
    n2 = 1
    while True:
        n = n1 + n2
        for b in [n]*n:
            yield b
        n1 = n2
        n2 = n

f = fib()
def main():
    # Make turtle instant
    t.speed(0)
    t.delay(0.001)
    # t.ht()
    # t.tracer(0, 0)

    h = 700
    w = 700
    t.pencolor(0.9, 0.8, 0.7)
    t.setup(w+200, h+200)
    t.penup()
    t.pensize(3)

    random.seed("helloworld")
    rows = [((-w//2,x-h//2), (w//2,x-h//2)) for x in range(0,h+1,h//90)]
    cols = [((x-w//2,h//2), (x-w//2,-h//2)) for x in range(0,w+1,w//90)]
    lines = []
    for r, c in zip(rows, cols):
        lines.append(c)
        lines.append(r)

    for l in lines:
        c = t.pencolor()
        t.pensize(t.pensize()*0.99)
        t.color(c[0]*0.995, c[1]*0.99, c[2])
        draw(l)

    t.ht()
    canvas_to_png()
    t.done()

def draw(coords):
    c1 = coords[0]
    c2 = coords[1]

    n = next(f)
    t.goto(c1[0], c1[1])
    t.pendown()
    t.goto(c2[0]//3, c2[1]//3)
    t.goto(c2[0], c2[1])
    t.penup()

    
    


def canvas_to_png():
    files = os.listdir()
    i = 0
    while True:
        name = str(i) + ".png"
        if name not in files:
            break
        i += 1
    t.getscreen().getcanvas().postscript(file="temp.eps")
    Image.open("temp.eps").convert("RGB").save(name, subsampling=0, quality=100)
    os.remove("temp.eps")

if __name__ == "__main__":
    main()
