/*
Genuary 2024
JAN.2 "No palettes."
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
    background(rainbow(2/31));

    let margin = 75;
    let d = (width-2*margin)/8;
    let leftToRight = true;
    for (let y = margin; y <= height-margin; y += d) {
        let density = random(10, 100);
        for (let x = margin; x < width-margin; x++) {
            fill(easeInOutCirc(noise(x/density, y))*255);
            if (leftToRight) circle(x, y, d);
            else circle(width-x, y, d);
        }
        leftToRight = !leftToRight;
    }
}

// from easings.net
function easeInOutCirc(x) {
    return x < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;    
}