/*
Genuary 2024
JAN.27 "Code for one hour. At the one hour mark, you’re done."
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
    let nDivs = 25*~~random(1, 5);
    let dMax = width;
    let dStep = dMax/nDivs;
    let palette = [rainbow(27/31), 5, 250, 128];
    let prevCol = palette[0];
    for (let d = dMax; d > 0; d -= dStep) {
        let col;
        do {
            col = random(palette);
        } while (col == prevCol)
        prevCol = col;
        fill(col);
        square(width/2, height/2, d);
    }

    let u = width/nDivs, max1 = ~~random(1, nDivs), max2 = ~~random(1, nDivs);
    for (let i = 0; i < 20; i++) {
        if (random() < 1/2) {
            let x = u*~~random(nDivs), w = u*~~random(1, max1);
            let stripe = get(x, 0, w, height);
            let y = u*~~random(-max2, max2+1);
            image(stripe, x, y);
            image(stripe, x, y-height);
            image(stripe, x, y+height);
        } else {
            let y = u*~~random(nDivs), h = u*~~random(1, max1);
            let stripe = get(0, y, width, h);
            let x = u*~~random(-max2, max2+1);
            image(stripe, x, y);
            image(stripe, x-width, y);
            image(stripe, x+width, y);
        }   
    }
}