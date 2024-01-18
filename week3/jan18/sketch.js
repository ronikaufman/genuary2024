/*
Genuary 2024
JAN.18 "Bauhaus."
By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noFill();
    noLoop();
    strokeCap(SQUARE);
}

function draw() {
    background(rainbow(18/31));

    let n = 7;
    let sizes = Array.from({length: n}, (x, i) => (i+1));
    let sum = 0;
    sizes.map(e => sum += e);

    let margin = 50;
    let gap = 5;
    let u = (width-2*margin-(n-1)*gap)/sum;
    let sw = u/4;

    let flipLetters = random() < 1/2;
    let flipShapes = random() < 1/2;

    let x = margin;
    let xSizes = shuffle(sizes);
    let i = 0;
    while (x < width-margin) {
        let w = xSizes.pop()*u;
        let y = margin;
        let ySizes = shuffle(sizes);
        let j = 0;
        while (y < height-margin) {
            let h = ySizes.pop()*u;
            sw = sq(min(w, h)+10)/400;

            let k1 = i, k2 = j;
            if (flipLetters) [k1, k2] = [k2, k1];
            let x1 = x+sw/2, y1 = y+sw/2, w1 = w-sw, h1 = h-sw;
            if (flipShapes) [x1, y1, w1, h1] = [y1, x1, h1, w1];

            stroke((k1 % 2)*255);
            strokeWeight(sw);

            if (k2 == 0) letterB(x1, y1, w1, h1, sw);
            else if (k2 == 1 || k2 == 4) letterA(x1, y1, w1, h1, sw);
            else if (k2 == 2 || k2 == 5) letterU(x1, y1, w1, h1, sw);
            else if (k2 == 3) letterH(x1, y1, w1, h1, sw);
            else letterS(x1, y1, w1, h1, sw);

            y += h+gap;
            j++;
        }
        x += w+gap;
        i++;
    }
}

function letterA(x, y, w, h, sw) {
    let d = (w > h) ? h/2 : w;
    line(x, y+d/2, x, y+h);
    line(x+w, y+d/2, x+w, y+h);
    line(x, y+h-(h-d/2)/2, x+w, y+h-(h-d/2)/2);
    line(x+d/2, y, x+w-d/2, y);
    arc(x+d/2, y+d/2, d, d, PI, 3*PI/2);
    arc(x+w-d/2, y+d/2, d, d, -PI/2, 0);

    // fix extremities
    line(x-sw/2, y+h, x+sw/2, y+h);
    line(x-sw/2+w, y+h, x+sw/2+w, y+h);
}

function letterB(x, y, w, h, sw) {
    let d = min(w, h/2);
    line(x, y, x, y+h);
    line(x, y, x+w-d/2, y);
    line(x, y+h/2, x+w-d/2, y+h/2);
    line(x, y+h, x+w-d/2, y+h);
    line(x+w, y+d/2, x+w, y+h/2-d/2);
    line(x+w, y+h/2+d/2, x+w, y+h-d/2);
    arc(x+w-d/2, y+d/2, d, d, -PI/2, 0);
    arc(x+w-d/2, y+h/2-d/2, d, d, 0, PI/2);
    arc(x+w-d/2, y+h/2+d/2, d, d, -PI/2, 0);
    arc(x+w-d/2, y+h-d/2, d, d, 0, PI/2);

    // fix extremities
    line(x-sw/2, y, x+sw/2, y);
    line(x-sw/2, y+h, x+sw/2, y+h);
}

function letterH(x, y, w, h, sw) {
    line(x, y, x, y+h);
    line(x+w, y, x+w, y+h);
    line(x, y+h/2, x+w, y+h/2);

    // fix extremities
    line(x-sw/2, y+h, x+sw/2, y+h);
    line(x-sw/2+w, y+h, x+sw/2+w, y+h);
    line(x-sw/2, y, x+sw/2, y);
    line(x-sw/2+w, y, x+sw/2+w, y);
}

function letterS(x, y, w, h, sw) {
    let d = min(w, h/2);
    line(x+d/2, y, x+w-d/2, y);
    line(x+d/2, y+h/2, x+w-d/2, y+h/2);
    line(x+d/2, y+h, x+w-d/2, y+h);
    line(x, y+d/2, x, y+h/2-d/2);
    line(x+w, y+h/2+d/2, x+w, y+h-d/2);
    arc(x+d/2, y+d/2, d, d, PI, 3*PI/2);
    arc(x+w-d/2, y+d/2, d, d, -PI/2, 0);
    arc(x+d/2, y+h/2-d/2, d, d, PI/2, PI);
    arc(x+w-d/2, y+h/2+d/2, d, d, -PI/2, 0);
    arc(x+w-d/2, y+h-d/2, d, d, 0, PI/2);
    arc(x+d/2, y+h-d/2, d, d, PI/2, PI);
}

function letterU(x, y, w, h, sw) {
    let d = min(w, h);
    line(x, y, x, y+h-d/2);
    line(x+w, y, x+w, y+h-d/2);
    line(x+d/2, y+h, x+w-d/2, y+h);
    arc(x+d/2, y+h-d/2, d, d, PI/2, PI);
    arc(x+w-d/2, y+h-d/2, d, d, 0, PI/2);

    // fix extremities
    line(x-sw/2, y, x+sw/2, y);
    line(x-sw/2+w, y, x+sw/2+w, y);
}