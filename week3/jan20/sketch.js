/*
Genuary 2024
JAN.20 "Generative typography."
By Roni Kaufman
https://ronikaufman.github.io
*/

let myFont;
let fontSize = 100;
let colOfTheDay;

function preload() {
    myFont = loadFont("./assets/Blackout Midnight.ttf");
}

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noLoop();
    colOfTheDay = rainbow(20/31);
}

function draw() {
    background(245);

    textFont(myFont, fontSize);
    let h = textAscent("A");
    let gap = 10;
    let lines = ["ABCDEF", "GHIJKL", "MNOPQR", "STUVWX", "YZ"];
    let nLines = lines.length;
    let wLine = textWidth(lines[0]);
    for (let i = 1; i < nLines; i++) {
        let w = textWidth(lines[i]);
        if (w > wLine) wLine = w;
    }
    let horizontalMargin = (width-wLine)/2;
    let verticalMargin = (height-nLines*h-(nLines-1)*gap)/2;

    let nLettersMax = 0;
    for (let line of lines) {
        let nLetters = line.length;
        if (nLetters > nLettersMax) nLettersMax = nLetters;
    }
    let nFunc = random([
        (i, j) => (1+i),
        (i, j) => (1+j),
        (i, j) => (nLines-i),
        (i, j) => (nLettersMax-j)
    ]);
    nFunc = (i, j) => (nLettersMax-j)
    
    let y = verticalMargin+h;
    for (let i = 0; i < nLines; i++) {
        let str = lines[i];
        let x = horizontalMargin;
        let letters = str.split("");
        let nLetters = letters.length;
        for (let j = 0; j < nLetters; j++) {
            drawLetter(letters[j], x, y, 15*sq(nFunc(i, j)));
            x += textWidth(letters[j]);
        }
        y += h+gap;
    }
}

function drawLetter(letter, x, y, n) {
    let points = myFont.textToPoints(letter, x, y, fontSize, {sampleFactor: 0.1});
    let nPoints = points.length;
    for (let i = 0; i < n; i++) {
        let idx1 = ~~random(nPoints), p1 = points[idx1];
        let idx2, p2;
        let fountPair = false;
        while (!fountPair) {
            fountPair = true;
            idx2 = ~~random(nPoints), p2 = points[idx2];
            if (idx2 == idx1) continue;
            let intersectsPoints = false;
            for (let j = 0; j < nPoints-1; j++) {
                if (j == idx1 || j == idx2 || j+1 == idx1 || j+1 == idx2) continue;
                let p3 = points[j], p4 = points[j+1];
                if (segmentsIntersect([p1, p2], [p3, p4])) {
                    intersectsPoints = true;
                    break;
                }
            }
            if (intersectsPoints) fountPair = false;
        }
        stroke(random([5, colOfTheDay]));
        line(p1.x, p1.y, p2.x, p2.y);
    }
}


// from https://www.codeease.net/programming/javascript/detect-if-two-line-segments-intersect-each-other-javascript
function segmentsIntersect(seg1, seg2) {
    var dx1 = seg1[1].x - seg1[0].x;
    var dy1 = seg1[1].y - seg1[0].y;
    var dx2 = seg2[1].x - seg2[0].x;
    var dy2 = seg2[1].y - seg2[0].y;
    var delta = dx2 * dy1 - dy2 * dx1;
    if (delta === 0) return false; // parallel segments
    var s = (dx1 * (seg2[0].y - seg1[0].y) + dy1 * (seg1[0].x - seg2[0].x)) / delta;
    var t = (dx2 * (seg1[0].y - seg2[0].y) + dy2 * (seg2[0].x - seg1[0].x)) / (-delta);
    return (s >= 0 && s <= 1 && t >= 0 && t <= 1);
}