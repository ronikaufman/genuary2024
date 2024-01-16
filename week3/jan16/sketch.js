/*
Genuary 2024
JAN.16 "Draw 10 000 of something."
By Roni Kaufman
https://ronikaufman.github.io
*/

let u = 1;
let squares = [];
let colOfTheDay;

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noStroke();
    noLoop();

    colOfTheDay = rainbow(16/31);
}

function draw() {
    background(colOfTheDay);

    createComposition(u, u, width-2*u, [5, 250]);

    shuffle(squares, true);
    squares.sort((sq1, sq2) => sq2.s - sq1.s);

    for (let i = 0; i < 1e4; i++) {
        let sq = squares[i];
        fill(sq.col);
        square(sq.x, sq.y, sq.s, u);
    }
}

function createComposition(x, y, s, palette) {
    let col = random(palette);
    fill(col);
    squares.push({
        x: x,
        y: y,
        s: s,
        col: col
    });
    let newS = s/2-u*3/2;

    if (newS > 0) {
        let newPalette = (col == 5) ? [250, colOfTheDay] : ((col == 250) ? [colOfTheDay, 5] : [5, 250]);
        createComposition(x+u, y+u, newS, newPalette);
        createComposition(x+s/2+u/2, y+u, newS, newPalette);
        createComposition(x+u, y+s/2+u/2, newS, newPalette);
        createComposition(x+s/2+u/2, y+s/2+u/2, newS, newPalette);
    }
}