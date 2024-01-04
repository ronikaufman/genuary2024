/*
Genuary 2024
JAN.4 "Pixels."
By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
    createCanvas(500, 500, WEBGL);
    pixelDensity(3);
    noLoop();
    noStroke();
}

function draw() {
    background(rainbow(4/31));
    translate(-width/2, -height/2);

    let n = random([3, 4, 5, 6]);
    let margin = 30, gap = 15;
    let s = (width-2*margin-(n-1)*gap)/n;
    let pixDivs = shuffle([...Array(sq(n)).keys()]);

    for (let x = margin; x < width-margin; x += s+gap) {
        for (let y = margin; y < height-margin; y += s+gap) {
            makeSphere(x, y, s, s/(pixDivs.pop()+1));
        }
    }
}

function makeSphere(x0, y0, s, pix) {
    for (let x = x0; x < x0+s; x += pix) {
        for (let y = y0; y < y0+s; y += pix) {
            let stx = map(x+pix/2, x0, x0+s, 0, 1);
            let sty = map(y+pix/2, y0, y0+s, 0, 1);
            let v = sqrt(1/4-sq(sty-1/2));
            let x1 = 1/2-v, x2 = 1/2+v;
            let col = (stx-x1)/(x2-x1);
            if (col > 0 && col < 1) {
                fill(col*255);
                square(x, y, pix);
            }
        }
    }
}