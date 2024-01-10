/*
Genuary 2024
JAN.10 "Hexagonal."
By Roni Kaufman
https://ronikaufman.github.io
*/

let s, h;
let hexagons;

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noLoop();
    stroke(0);
}

function draw() {
    background(rainbow(10/31));

    let margin = 60;
    let n = 48;
    h = (height-2*margin)/n;
    s = h*2/sqrt(3);
    let m = floor((width-2*margin)/s);

    strokeWeight(2);
    let possibleCenters = [];
    for (let j = -n/2; j <= n/2; j++) {
        for (let i = -m/2; i <= m/2; i++) {
            let x = 250 + s*i + (abs(j) % 2 == 1 ? s/2 : 0);
            let y = 250 + h*j;
            point(x, y);
            possibleCenters.push([i, j]);
        }
    }
    shuffle(possibleCenters, true);

    hexagons = [];
    while (possibleCenters.length > 0) {
        let [i, j] = possibleCenters.pop();
        let newHexa = new Hexagon(i, j, 1);
        newHexa.grow();
        if (newHexa.exists()) {
            hexagons.push(newHexa);
            newHexa.render();
        }
    }
}

function Hexagon(i, j, r) {
    this.i = i;
    this.j = j;
    this.r = r*s;

    this.x = width/2 + s*i + (abs(j) % 2 == 1 ? s/2 : 0);
    this.y = height/2 + h*j;

    this.pattern = random(["concentric", "lines"]);

    this.grow = function() {
        while (this.fitsIn() && this.r < 120) {
            this.r += s;
            this.h = this.r*sqrt(3)/2;
        }
        this.r -= s;
        this.h = this.r*sqrt(3)/2;
    }

    this.fitsIn = function() {
        for (let hexa of hexagons) {
            if (this.intersects(hexa)) return false;
        }
        let margin = 10;
        if (this.x-this.r < margin || this.x+this.r > width-margin || this.y-this.h < margin || this.y+this.h > height-margin) {
            return false;
        }
        return true;
    }

    this.intersects = function(hexa) {
        return dist(this.x, this.y, hexa.x, hexa.y) <= this.r + hexa.r + 1;
    }

    this.exists = function() {
        return this.r > 0;
    }

    this.render = function() {
        fill(255);

        strokeWeight(0);
        beginShape();
        for (let theta = 0; theta < TAU; theta += TAU/6) {
            let x = this.x + this.r*cos(theta);
            let y = this.y + this.r*sin(theta);
            vertex(x, y);
        }
        endShape();

        strokeWeight(2);

        if (this.pattern == "concentric") {
            for (let r = this.r-s; r >= 0; r -= s) {
                beginShape();
                for (let theta = 0; theta < TAU; theta += TAU/6) {
                    let x = this.x + r*cos(theta);
                    let y = this.y + r*sin(theta);
                    vertex(x, y);
                }
                endShape();
            }
        } else {
            push();
            translate(this.x, this.y);
            rotate(random([0, TAU/3, 2*TAU/3]));
            for (let yOff = -this.h+h; yOff < this.h-0.01; yOff += h) {
                let w = (abs(yOff) + 2*(this.h-abs(yOff)))/sqrt(3);
                line(-w, yOff, w, yOff);
            }
            pop();
        }

        strokeWeight(4);
        for (let theta = 0; theta < TAU/2; theta += TAU/3) {
            push();
            translate(this.x, this.y);
            rotate(theta);
            for (let yOff = -this.h; yOff < this.h; yOff += h) {
                let w = (abs(yOff) + 2*(this.h-abs(yOff)))/sqrt(3);
                point(-w, yOff);
                point(w, yOff);
            }
            pop();
        }
    }
}