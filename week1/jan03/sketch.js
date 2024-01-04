/*
Genuary 2024
JAN.3 "Droste effect."
By Roni Kaufman
https://ronikaufman.github.io
*/

const N = 5;
let paths = [];

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noLoop();
    noFill();

    findPaths([0, 0], [[0, 0]]);
    shuffle(paths, true);
}

function draw() {
    background(rainbow(3/31));

    let n = 6;
    let w = width-width/(n*2*N+2), h = height-height/(n*2*N+2);
    let x0 = (width-w)/2, y0 = (height-h)/2;

    while (w > 0.1) {
        let leftToRight = true;
        let topToBottom = false;

        let sw = w/(n*2*N+2);
        strokeWeight(sw);
        stroke(255);
        square(x0, y0, w);

        let s = (w-2*sw)/n;
        x0 += sw;
        y0 += sw;
        strokeWeight(s/(2*N));
        stroke(0);

        beginShape();

        for (let i = 0; i < n; i++) {
            let x = x0 + s*i;
            makeTile(x, y0, s, i, leftToRight, topToBottom);
            topToBottom = !topToBottom;
        }

        leftToRight = !leftToRight;
        topToBottom = !topToBottom;
        for (let i = 1; i < n; i++) {
            let y = y0 + s*i;
            makeTile(x0+w-s-2*sw, y, s, i+n, leftToRight, topToBottom);
            leftToRight = !leftToRight;
        }

        leftToRight = !leftToRight;
        topToBottom = !topToBottom;
        for (let i = 1; i < n; i++) {
            let x = x0 + w - s*(i+1);
            makeTile(x-2*sw, y0+h-s-2*sw, s, i+2*n, leftToRight, topToBottom);
            topToBottom = !topToBottom;
        }

        leftToRight = !leftToRight;
        topToBottom = !topToBottom;
        for (let i = 1; i < n-1; i++) {
            let y = y0 + h - s*(i+1);
            makeTile(x0, y-2*sw, s, i+3*n, leftToRight, topToBottom);
            leftToRight = !leftToRight;
        }

        endShape(CLOSE);

        w -= 2*s+4*sw;
        h -= 2*s+4*sw;
        x0 += s+sw;
        y0 += s+sw;
    }
}

function makeTile(x0, y0, s, i, leftToRight, topToBottom) {
    //square(x0, y0, s);
    /*
    for (let i = 0; i < 10; i++)
    curveVertex(x+random(s), y+random(s));
    */
    let path = paths[i];
    let newS = s/N;
    for (let [i, j] of path) {
        let x = leftToRight ? i*newS : (N-i-1)*newS;
        let y = topToBottom ? j*newS : (N-j-1)*newS;
        vertex(x0+x+newS/2, y0+y+newS/2);
    }
}

function possibleNeighbors([i, j]) {
    let possibilities = [];
    if (i % 2 == 0 && j < N-1) possibilities.push([i, j+1]);
    if (i % 2 == 1 && j > 0) possibilities.push([i, j-1]);
    if (j % 2 == 0 && i < N-1) possibilities.push([i+1, j]);
    if (j % 2 == 1 && i > 0) possibilities.push([i-1, j]);
    return possibilities;
}
  
function inArray([i, j], arr) {
    for (let e of arr) {
        if (e[0] == i && e[1] == j) return true;
    }
    return false;
}
  
// find all paths in a N*N grid, going from top-left to bottom-right and through all points
function findPaths(p, visited) {
    let neighbors = possibleNeighbors(p);
    if (neighbors.length == 0) {
        if (visited.length == sq(N)) paths.push(visited);
        return;
    }
    for (let neigh of neighbors) {
        if (!inArray(neigh, visited)) findPaths(neigh, [...visited, neigh]);
    }
}