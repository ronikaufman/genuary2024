/*
Genuary 2024
JAN.15 "Use a physics library."
By Roni Kaufman
https://ronikaufman.github.io
*/

// module aliases
let Engine = Matter.Engine,
    Bodies = Matter.Bodies,
    World = Matter.World;

let engine;
let world;
let balls;

let rad = 66;

let myFont;

function preload() {
    myFont = loadFont("./assets/Solway-Regular.ttf");
}

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noStroke();

    textFont(myFont, rad);
    textAlign(CENTER, CENTER);

    engine = Engine.create();
    Engine.run(engine);
    world = engine.world;

    balls = [];
    let letters = "monday".split("");
    for (let letter of letters) {
        let ball = Bodies.circle(random(rad, width-rad), random(rad, height-rad), rad, {label: letter+"0"});
        World.add(world, ball);
        balls.push(ball);
    }
    letters = "15/01".split("");
    for (let letter of letters) {
        let ball = Bodies.circle(random(rad, width-rad), random(rad, height-rad), rad, {label: letter+"1"});
        World.add(world, ball);
        balls.push(ball);
    }
    console.log(balls[0])

    let thickness = 50;
    let ground = Bodies.rectangle(width/2, height+thickness/2, width, thickness, {isStatic: true});
    World.add(world, ground);
    let ceiling = Bodies.rectangle(width/2, -thickness/2, width, thickness, {isStatic: true});
    World.add(world, ceiling);
    let leftWall = Bodies.rectangle(-thickness/2, height/2, thickness, height, {isStatic: true});
    World.add(world, leftWall);
    let rightWall = Bodies.rectangle(width+thickness/2, height/2, thickness, height, {isStatic: true});
    World.add(world, rightWall);
}

function draw() {
    background(rainbow(15/31));

    for (let b of balls) {
        fill(b.label.charAt(1)*255);
        circle(b.position.x, b.position.y, 2*rad);
        fill((1-b.label.charAt(1))*255);
        push();
        translate(b.position.x, b.position.y);
        rotate(b.angle);
        text(b.label.charAt(0), 0, -rad/6);
        pop();
    }
}