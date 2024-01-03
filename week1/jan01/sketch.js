/*
Genuary 2024
JAN.1 "Particles, lots of them."
By Roni Kaufman
https://ronikaufman.github.io
*/

let gravity;
let circles = [];
let particles = [];

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);

    gravity = createVector(0, 0.1);

    for (let i = 0; i < 1000; i++) {
        let x0 = random(10, width-10);
        let y0 = random(10, height-10);

        let rMax = min([x0, y0, width-x0, height-y0]);
        for (let c of circles) {
            let d = dist(x0, y0, c.x, c.y) - c.r;
            if (d < rMax) {
                rMax = d;
            }
        }
        if (rMax < 20) continue;
        if (rMax > 100) rMax = 100;
        circles.push({
            x: x0,
            y: y0,
            r: rMax
        });

        let n = sqrt(rMax)*30;
        for (let i = 0; i < n; i++) {
            let theta = TAU*i/n + random(TAU/(2*n));
            let sp = random(2, 5);
            let life = sqrt(random())*rMax*0.3;
            particles.push(new Particle(x0, y0, theta, sp, life, rMax));
        }
    }    
}

function draw() {
    background(rainbow(1/31));

    noFill();
    stroke(0, 200);
    for (let p of particles) {    
        strokeWeight();
        p.drawHistory();
    }

    fill(255);
    noStroke();
    for (let p of particles) {
        if (p.isAlive()) {
            p.update();
        } else {
            p.drawPos();
        }
    }
}

function Particle(x0, y0, theta, sp, life, rMax) {
    this.x0 = x0;
    this.y0 = y0;
    this.pos = createVector(x0, y0);
    this.vel = p5.Vector.fromAngle(theta, sp);
    this.acc = createVector(0, 0);
    this.life = life;
    this.diam = sqrt(rMax)/random(2.5, 5);
    this.sw = sqrt(rMax)/random(7, 8);
    this.posHistory = [createVector(x0, y0)];

    this.update = function() {
        this.acc = createVector(0, 0);
        this.acc.add(gravity);
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.posHistory.push(createVector(this.pos.x, this.pos.y));
        this.life--;
    }

    this.isAlive = function() {
        if (this.life <= 0) return false;
        return true;
    }

    this.drawPos = function() {
        circle(this.pos.x, this.pos.y, this.diam);
    }

    this.drawHistory = function() {
        strokeWeight(this.sw);
        beginShape();
        for (let po of this.posHistory) {
            vertex(po.x, po.y);
        }
        endShape();
    }
}