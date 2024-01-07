/*
Genuary 2024
JAN.7 "Progress bar / indicator / loading animation."
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
    background(rainbow(7/31));

    let gap = 5;
    let nColumns = 10;
    let nLines = 40;
    let w = (width-(nColumns+1)*gap)/nColumns;
    let h = (height-(nLines+1)*gap)/nLines;
    let thetaMult = random([-3, -2, -1, 1, 2, 3]);
    for (let i = 0; i < nColumns; i++) {
        let x0 = gap + i*(w+gap);
        for (let j = 0; j < nLines; j++) {
            let y0 = gap + j*(h+gap);
            let tMin = 1;
            for (let x = x0; x < x0+w; x++) {
                let d = dist(x0+w/2, y0+h/2, width/2, height/2);
                let theta = atan2(height/2-(y0+h/2), width/2-(x0+w/2))
                let v = (sin(d/25+theta*thetaMult)+1)/2;
                if (v < tMin) tMin = v;
            }
            progressBar(x0+h/2, y0+h/2, w-h, h, tMin);
        }
    }
}

function progressBar(x0, y0, w, h, t) {
    for (let x = x0; x < x0+w; x++) {
        fill(255);
        circle(x, y0, h);
    }
    for (let x = x0; x < x0+w*t; x++) {
        fill(0);
        circle(x, y0, h);
    }
}