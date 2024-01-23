/*
Genuary 2024
JAN.23 "128×128."
By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
    createCanvas(500, 500, WEBGL);
    pixelDensity(3);
    noLoop();
    noStroke();
}

function draw() {
    background(rainbow(23/31));

    subdivide(-width/2, -height/2, width, 128, -255, 255);
}

function subdivide(x0, y0, s, n, colMin, colMax) {
    if (n == 1) {
        let alpha = random(colMin, colMax);
        if (alpha < 0) fill(250, -alpha);
        else fill(0, alpha);
        square(x0, y0, s);
        return;
    }
    let nDivs = random(divisors(n));
    let s1 = s/nDivs;
    let nColDivs = random([2, 3, 4]);
    let colUnit = (colMax-colMin)/nColDivs;
    let kGrid = [...Array(nDivs)].map(e => Array(nDivs));

    for (let i = 0; i < nDivs; i++) {
        let x1 = x0 + i*s1;
        for (let j = 0; j < nDivs; j++) {
            let y1 = y0 + j*s1;

            let kPossibilities = [...Array(nColDivs).keys()];
            let idx1 = i > 0 ? kPossibilities.indexOf(kGrid[i-1][j]) : -1;
            if (idx1 != -1) kPossibilities.splice(idx1, 1);
            let idx2 = j > 0 ? kPossibilities.indexOf(kGrid[i][j-1]) : -1;
            if (idx2 != -1) kPossibilities.splice(idx2, 1);
            let choice = random([random, max, min]); // this is a good choice
            let k = choice(kPossibilities);
            kGrid[i][j] = k;

            subdivide(x1, y1, s1, n/nDivs, colMin+k*colUnit, colMin+(k+1)*colUnit);
        }
    }
}

function divisors(n) {
    if (n == 2) return [2];
    let divs = [];
    for (let i = 2; i < n; i++) {
        if (n/i == ~~(n/i)) divs.push(i);
    }
    return divs;
}