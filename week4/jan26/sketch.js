/*
Genuary 2024
JAN.26 "Grow a seed."
By Roni Kaufman
https://ronikaufman.github.io
*/

let particles = [];

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    //noLoop();
    noStroke();

    particles.push(new Particle(width/2, height/2, 5, PI/2, rainbow(26/31), 5, 1/40));

    background(250);
    fill(0);
    rect(0, height/2, width, height/2);
}

function draw() {
    let theEnd = true;
    let newParticles = [];

    for (let p of particles) {
        if (p.alive()) {
            p.draw();
            p.move();
            if (p.shouldSplit()) {
                newParticles.push(p.split(-random(PI/8, PI/6), random(PI/8, PI/6)));
            }
            theEnd = false;
        }
    }

    particles = [...particles, ...newParticles];
    if (theEnd) noLoop();
}

function Particle(x, y, d, theta, col1, col2, probSplit) {
    this.x = x;
    this.y = y;
    this.d = d;
    this.theta = theta;
    this.col1 = col1;
    this.col2 = col2;
    this.probSplit = probSplit;
    this.speed = random(0.4, 0.8);
    this.lifespan = 0;

    this.draw = function() {
        fill(this.col1);
        circle(this.x, this.y, this.d);
        fill(this.col2);
        circle(width-this.x, height-this.y, this.d);
    }

    this.move = function() {
        let r = this.d/2*this.speed;
        this.x = this.x + r*cos(this.theta);
        this.y = this.y + r*sin(this.theta);
        this.d -= 0.017;
        if ((abs(this.x - width/2) > 10 && abs(this.y - height/2) < 20) || (abs(this.y - height) < 20)) this.d *= 0.97;
        this.lifespan++;
    }

    this.shouldSplit = function() {
        return random() < this.probSplit || this.lifespan > 1/this.probSplit;
    }

    this.split = function(theta0, theta1) {
        let newTheta = this.theta + theta0;
        this.theta = this.theta + theta1;
        this.lifespan = 0;
        return new Particle(this.x, this.y, this.d, newTheta, this.col1, this.col2, this.probSplit);
    }

    this.alive = function() {
        return this.d > 0;
    }
 }