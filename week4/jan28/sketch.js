/*
Genuary 2024
JAN.28 "Skeuomorphism."
By Roni Kaufman
https://ronikaufman.github.io
*/

let n, u, s;
let squares = [];

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noStroke();

    background(240);

    n = 200;
    u = width/n;
    for (let z = 0; z < width; z += u) {
        fabricLine(0, z, width, z, u/2);
        fabricLine(z, 0, z, height, u/2);
    }

    s = u*4;
    let margin = 20*u;
    let [a, b, c] = random([
        [60, 2, 5],
        [40, 4, 10],
        [10, 6, 20],
        [20, 8, width]
    ]);
    if (random() < 1/2) b *= -1;
    for (let y = margin; y < height-margin; y += s) {
        for (let x = margin; x < width-margin; x += s) {
            let d = dist(x+s/2, y+s/2, width/2, height/2);
            let theta = atan2(y+s/2-height/2, x+s/2-width/2)
            if ((sin(sin(d/a) + theta*b) < 0) != (sin(d/c) > 0)) squares.push([x, y]);
        }
    }
}

function draw() {
    let colOfTheDay = rainbow(28/31);
    let myRed = red(colOfTheDay), myGreen = green(colOfTheDay), myBlue = blue(colOfTheDay);
    let th = s/3.5;

    let squ = squares.shift();
    crossStitch(squ[0], squ[1], s, th, myRed, myGreen, myBlue);

    if (squares.length == 0) noLoop();
}

function fabricLine(x1, y1, x2, y2, thickness) {
    for (let t = 0; t < 1; t += 0.002) {
        let x = x1*(1-t) + x2*t;
        let y = y1*(1-t) + y2*t;
        fill(0, random(10, 20));
        circle(x, y, random(thickness));
        fill(0, random(10, 20));
        circle(x, y, random(thickness));
    }
}

function crossStitch(x, y, s, thickness, myRed, myGreen, myBlue) {
    let maxDisp = s/20;
    stitch(x+random(-1, 1)*maxDisp, y+random(-1, 1)*maxDisp, x+s+random(-1, 1)*maxDisp, y+s+random(-1, 1)*maxDisp, thickness, myRed, myGreen, myBlue);
    stitch(x+s+random(-1, 1)*maxDisp, y+random(-1, 1)*maxDisp, x+random(-1, 1)*maxDisp, y+s+random(-1, 1)*maxDisp, thickness, myRed, myGreen, myBlue);
}

function stitch(x1, y1, x2, y2, thickness, myRed, myGreen, myBlue) {
    let threadThickness = 2;
    let tStep = threadThickness/dist(x1, y1, x2, y2);
    let theta = atan2(y2-y1, x2-x1);
    let rot = PI/3;
    let rMax = thickness/(2*sin(rot))*random(0.8, 1.2);
    for (let t = 0; t < 1; t += tStep/2) {
        let x = x1*(1-t) + x2*t;
        let y = y1*(1-t) + y2*t;
        let r = rMax*(1-pow(cos(t*PI), 6)*4/5);
        let xA = x + r*cos(theta+rot);
        let yA = y + r*sin(theta+rot);
        let xB = x + r*cos(theta+rot+PI);
        let yB = y + r*sin(theta+rot+PI);
        let colOffset = -60 + random(-20, 20);
        gradientLine(xA, yA, xB, yB, threadThickness/2, myRed, myGreen, myBlue, myRed+colOffset, myGreen+colOffset, myBlue+colOffset)
    }
}

function gradientLine(xA, yA, xB, yB, th, rA, gA, bA, rB, gB, bB) {
    for (let t = 0; t < 1; t += 0.01) {
        let x = xA*(1-t) + xB*t;
        let y = yA*(1-t) + yB*t;
        let r = rA*(1-t) + rB*t;
        let g = gA*(1-t) + gB*t;
        let b = bA*(1-t) + bB*t;
        fill(r+random(-1, 1)*2, g+random(-1, 1)*2, b+random(-1, 1)*2);
        circle(x, y, th);
    }
}