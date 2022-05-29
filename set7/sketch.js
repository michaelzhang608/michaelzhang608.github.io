function setup() {
    createCanvas(800, 800);
  }
  
  function draw() {
    noLoop();
    background(214, 214, 214);
    scale(0.4);
  
    R = 500;
    C = 500;
  
    // Create grid
    grid = [];
    for (let i = 0; i < R; i++) {
      temp = [];
      for (let j = 0; j < C; j++) {
        temp.push([1, 1, 1]);
      }
      grid.push(temp);
    }
  
    for (let x = 0; x < 10; x++) {
      for (let i = 0; i < 10; i++) {
        for (let color in [0, 1, 2]) {
          r = round(x * 40 * random());
          c = 200 + round(random(-200, 200));
          for (let j = 0; j < 1500; j++) {
            try {
              r += random([-1, 0, 1]);
              if (random() < 0.4 + c / C) {
                c -= 1;
              } else {
                c += 1;
              }
  
              grid[r][c][color] += 1;
            } catch (e) {
              break;
            }
          }
        }
      }
    }
    for (let i = 0; i < 10; i++) {
      for (let color in [0, 1, 2]) {
        r = 200;
        c = 200 + round(random(-200, 200));
        while (true) {
          try {
            r += random([-1, 0, 1]);
            if (random() < 0.5) {
              c -= 1;
            } else {
              c += 1;
            }
  
            grid[r][c][color] += 1;
          } catch (e) {
            break;
          }
        }
      }
    }
  
    // Print squares
    for (let i = 0; i < R; i++) {
      for (let j = 0; j < C; j++) {
        data = grid[i][j];
        fill(
          200 / data[0],
          200 / data[1],
          200 / data[2],
          100 + 10 * (data[0] + data[1] + data[2])
        );
        noStroke();
        square(i * 5, j * 5, 4);
      }
    }
    save();
  }
  