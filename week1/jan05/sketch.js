/*
Genuary 2024
JAN.5 "In the style of Vera Molnár (1924-2023)."
By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noLoop();
    noStroke();
    rectMode(CENTER);
}

function draw() {
    background(rainbow(5/31));

    let n = 10;
    let iMissing = ~~random(n);
    let jMissing = ~~random(n);
    let tileSize = width/n;
    let shades = [];
    let nShades = 5;
    for (let i = 1; i <= nShades; i++) {
        shades.push(255*i/(nShades+1))
    }

    for (let i = 0; i < n; i++) {
        let x = i*tileSize;
        for (let j = 0; j < n; j++) {
            let y = j*tileSize;
            let maxRot = j*HALF_PI/(n-1);
            if (i != iMissing || j != jMissing) {
                let nSquares = i+2;
                let prevShade = 0;
                for (let k = nSquares; k > 0; k--) {
                    let s = k*tileSize/nSquares;
                    fill(random(255));
                    if ((i+j) % 2 == 0) fill(250*(k%2));
                    else {
                        let newShade;
                        do {
                            newShade = random(shades);
                        } while (newShade == prevShade)
                        fill(newShade);
                        prevShade = newShade;
                    }
                    push();
                    translate(x+tileSize/2, y+tileSize/2);
                    rotate((noise(i) > 1/2 ? 1 : -1)*maxRot*(1-k/nSquares));
                    square(0, 0, s);
                    pop();
                }
            }
        }
    }
}