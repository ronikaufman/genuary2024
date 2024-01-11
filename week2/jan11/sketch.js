/*
Genuary 2024
JAN.11 "In the style of Anni Albers (1899-1994)."
By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noLoop();
    noStroke();
}

function draw() {
    background(220);

    let brightCol = rainbow(11/31);
    let margin = 50;
    let n = 32;
    let s = (width-2*margin)/n;

    let factor1 = random([8, 16, 32]), factor2 = random([4, 8, 16]), factor3 = random([8, 16]), factor4 = random([8, 16, 32]);
    factor1 = 8
    factor2 = 16
    factor3 = 16
    factor4 = 32
    let k1 = factor1 == 32 ? 0 : random([0, 1]), k2 = random([0, 1]), k3 = random([0, 1]), k4 = factor4 == 32 ? 0 : random([0, 1]);
    let gridShape1 = random() < 1/2, gridShape2 = random() < 1/2, gridShape3 = random() < 1/2, gridShape4 = random() < 1/2;
    gridShape1 = true
    gridShape2 = false
    gridShape3 = false
    gridShape4 = true

    let plainSquares = Array(n).fill([]).map(e => Array(n).fill(false));

    for (let i = 0; i < n; i++) {
        let x = margin+i*s;
        for (let j = 0; j < n; j++) {
            let y = margin+j*s;

            let paintItBlack = determineParam(i, j, n, factor1, k1, gridShape1);
            let plainIsWhite = determineParam(i, j, n, factor2, k2, gridShape2);
            let upDown = determineParam(i, j, n, factor3, k3, gridShape3);
            let canBePlain = determineParam(i, j, n, factor4, k4, gridShape4);

            if (paintItBlack) fill(5);
            else fill(brightCol);

            if (i > 0 && plainSquares[i-1][j]) canBePlain = false;
            if (j > 0 && plainSquares[i][j-1]) canBePlain = false;
            if (i > 0 && j > 0 && plainSquares[i-1][j-1]) canBePlain = false;
            if (canBePlain && random() < 1/2) {
                if (!plainIsWhite) square(x, y, s);
                plainSquares[i][j] = true;
            } else {
                if (upDown) {
                    if (j%2 == 0) {
                        if (i%2 == 0) {
                            triangle(x, y, x+s, y, x+s, y+s);
                        } else {
                            triangle(x+s, y+s, x+s, y, x, y+s);
                        }
                    } else {
                        if (i%2 == 0) {
                            triangle(x, y, x, y+s, x+s, y+s);
                        } else {
                            triangle(x, y, x+s, y, x, y+s);
                        }
                    }
                } else {
                    if (i%2 == 0) {
                        if (j%2 == 0) {
                            triangle(x, y, x+s, y, x+s, y+s);
                        } else {
                            triangle(x, y, x+s, y, x, y+s);
                        }
                    } else {
                        if (j%2 == 0) {
                            triangle(x, y, x, y+s, x+s, y+s);
                        } else {
                            triangle(x+s, y+s, x+s, y, x, y+s);
                        }
                    }
                }
            }
        }
    }
}

function determineParam(i, j, n, factor, k, gridShape) {
    let gridVal = 4*(floor(max(abs(i-n/2+1/2), abs(j-n/2+1/2))) % (factor/2));
    return gridShape
        ? (floor(i/factor) + floor(j/factor)) % 2 == k
        : (k == 0 ? gridVal < factor : gridVal >= factor);
}