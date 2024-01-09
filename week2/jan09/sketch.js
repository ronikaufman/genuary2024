/*
Genuary 2024
JAN.9 "ASCII."
By Roni Kaufman
https://ronikaufman.github.io
*/

let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let jgs5;

function preload() {
    jgs5 = loadFont("./assets/jgs5.ttf");
}

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noLoop();
    noStroke();
}

function draw() {
    background(0);

    let mask1 = makeMask1();
    let mask2 = makeMask2();
    let refVal1 = random([0, 255]);
    let refVal2 = random([0, 255]);

    let nLetters = 192;
    let s = 2*width/(nLetters*5);
    textFont(jgs5, 2000/nLetters);
    textAlign(LEFT, BASELINE);
    for (let y = 0; y < height; y += 8*s) {
        let idx = ~~random(chars.length);
        for (let x = 0; x < width; x += 5*s) {
            let mask1Val = mask1.get(x+s/2, y+s/2+8*s)[0];
            let mask2Val = mask2.get(x+s/2, y+s/2+8*s)[0];
            if (mask2Val == refVal1) {
                fill(255);
            } else {
                fill(rainbow(9/31));
            }
            if (mask1Val == refVal2) {
                text(chars.charAt(idx%chars.length), x, y+8*s);
                idx++;
            } else {
                text(".", x, y+8*s);
            }
            
        }
    }

    mask1.remove();
    mask2.remove();
}

function makeMask1() {
    let nLetters = 10;
    let s = 2*width/(nLetters*5);

    let grph = createGraphics(width, height+1);
    grph.noStroke();
    grph.fill(255);
    grph.textFont(jgs5, 2000/nLetters);
    grph.textAlign(LEFT, BASELINE);
    grph.translate(grph.width/2, grph.height/2);
    grph.rotate(random(-PI/4, PI/4));
    for (let y = -height; y < height; y += 7.5*s) {
        let idx = ~~random(chars.length);
        for (let x = -width; x < width; x += 4.5*s) {
            grph.text(chars.charAt(idx%chars.length), x, y+8*s);
            idx++;
        }
    }
    return grph;
}

function makeMask2() {
    let fontSize = 600;
    let w = fontSize*4/10;
    let h = fontSize*7/10;

    let grph = createGraphics(width, height);
    grph.noStroke();
    grph.fill(255);
    grph.textFont(jgs5, fontSize);
    grph.textAlign(LEFT, BASELINE);
    grph.translate(width/2, height/2);
    grph.rotate(random(-PI/4, PI/4));
    grph.translate(-width/2, -height/2);
    let idx = ~~random(chars.length);
    grph.text(chars.charAt(idx), width/2-w/2, height/2+h/2);
    return grph;
}