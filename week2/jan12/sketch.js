/*
Genuary 2024
JAN.12 "Lava lamp."
By Roni Kaufman
https://ronikaufman.github.io
*/

let col;
let x, pixSize = 1/2;
let circles = [], lamps = [];
let rot;

function setup() {
    createCanvas(500, 500, WEBGL);
    pixelDensity(3);
    noStroke();

    col = rainbow(12/31);
    x = -width/3;

    let n = 4;
    let margin = 20, gap = 20;
    let w = (width-2*margin-(n-1)*gap)/n;
    let id = 0;
    for (let x = margin; x < width-margin; x += w+gap) {
        let balls = [];
        let y0 = -height/4 + random(-50, 50);
        let y1 = height*5/4 + random(-50, 50);
        let y = y0;
        while (y < y1) {
            let r = random(w/50, w/2);
            y += r;
            balls.push({
                x: x+random(r*1.5, w-r*1.5),
                y: y,
                r: r
            });
            y += 2*r + random(-r, 20);
        }
        lamps.push({
            x: x,
            w: w,
            balls: balls,
            id: id++
        });
    }
    rot = random([0, PI/4, PI/2, 3*PI/4]);

    background(col);
}

function draw() {
    rotate(rot);
    translate(-width/2, -height/2);

    for (let y = -height/3; y < height*4/3; y += pixSize) {
        fill(5);
        square(x, y, pixSize);
        for (let lamp of lamps) {
            if (lamp.x < x && x < lamp.x+lamp.w) {
                fill(col);
                square(x, y, pixSize);

                let v = 1 - (1 - cos(TAU * (x-lamp.x)/lamp.w))/2;

                let r = 25, theta = noise(x/500, y/500, lamp.id)*TAU*2;
                let xOff = r*cos(theta), yOff = r*sin(theta);
                for (let b of lamp.balls) {
                    if (dist(x+xOff, y+yOff, b.x, b.y) < b.r) {
                        fill(255);
                        square(x, y, pixSize);
                    }
                }

                fill(255, pow(v, 2)*200);
                square(x, y, pixSize);
            }
        }  
    }

    x += pixSize;
    if (x > width*4/3) noLoop();
}