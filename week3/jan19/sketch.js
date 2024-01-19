/*
Genuary 2024
JAN.19 "Flocking."
By Roni Kaufman
https://ronikaufman.github.io
*/

let boids = [];
const MAX_SPEED = 4;
const MAX_FORCE = 0.1;

let colOfTheDay;

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    //noLoop();

    let n = 100;
    let rMax = 50;
    let theta0 = random(TAU);
    let x0 = width/2, y0 = height/2;
    for (let i = 0; i <= n; i++) {
        let theta = TAU*i/n + theta0;
        let r = rMax * sqrt(random());
        let x = x0 + r*cos(theta);
        let y = y0 + r*sin(theta);
        boids.push(new Boid(x, y, theta));
    }

    colOfTheDay = rainbow(19/31);
    background(5);
}

function draw() {
    for (let bo of boids) {
        bo.update();
        stroke(colOfTheDay);
        fill(250, 8);
        bo.draw();
        if (bo.outside(0)) noLoop();
    }
}

function Boid(x, y, theta) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.fromAngle(theta);
    this.acc = createVector(0, 0);

    this.pastPos = [];

    this.separation = function() {
        let perceptionRadius = 24;
        let steering = createVector();
        let total = 0;
        for (let bo of boids) {
            let d = this.pos.dist(bo.pos);
            if (bo != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.pos, bo.pos);
                diff.div(sq(d));
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
          steering.div(total);
          steering.setMag(MAX_SPEED);
          steering.sub(this.vel);
          steering.limit(MAX_FORCE);
        }
        return steering;
    }

    this.alignment = function() {
        let perceptionRadius = 25;
        let steering = createVector();
        let total = 0;
        for (let bo of boids) {
            let d = this.pos.dist(bo.pos);
            if (bo != this && d < perceptionRadius) {
                steering.add(bo.vel);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(MAX_SPEED);
            steering.sub(this.vel);
            steering.limit(MAX_FORCE);
        }
        return steering;
    }

    this.cohesion = function() {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let bo of boids) {
            let d = this.pos.dist(bo.pos);
            if (bo != this && d < perceptionRadius) {
                steering.add(bo.pos);
                total++;
            }
        }
        if (total > 0) {
          steering.div(total);
          steering.sub(this.pos);
          steering.setMag(MAX_SPEED);
          steering.sub(this.vel);
          steering.limit(MAX_FORCE);
        }
        return steering;
    }

    this.update = function() {
        let alignment = this.alignment();
        let cohesion = this.cohesion().mult(1.1);
        let separation = this.separation();
    
        this.acc.add(alignment);
        this.acc.add(cohesion);
        this.acc.add(separation);

        this.pastPos.push(this.pos.copy());

        this.vel.add(this.acc);
        this.vel.limit(MAX_SPEED);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.draw = function() {
        beginShape();
        for (let p of this.pastPos) {
            vertex(p.x, p.y);
        }
        endShape();
    }

    this.outside = function(margin) {
        return this.pos.x < margin || this.pos.x > width-margin || this.pos.y < margin || this.pos.y > height-margin;
    }
}