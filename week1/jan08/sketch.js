/*
Genuary 2024
JAN.8 "Chaotic system."
By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noLoop();
    noStroke();
}

function draw() {
    background(rainbow(8/31));

    let points = createPoints();

    let n = random([3, 4, 4, 5]);
    let gap = 20;
    let s = (width-(n+1)*gap)/n;
    let d = s/50;
    let chaoticMap = random([bakerFolded, bakerUnfolded, arnoldsCat, logistic]);
    for (let j = 0; j < n; j++) {
        let y = gap + j*(s+gap);
        for (let i = 0; i < n; i++) {
            let x = gap + i*(s+gap);
            for (let p of points) {
                fill(p.col);
                circle(x + p.x*s, y + p.y*s, d);
            }
            chaoticMap(points);
        }
    }
}

function createPoints() {
    let points = [];

    for (let i = 0; i < 5000; i++) {
        let x = random(), y = random();
        let col = 0;
        if (dist(x, y, 1/2, 1/2) < 1/3) col = 255;
        points.push({
            x: x,
            y: y,
            col: col
        });
    }

    return points;
}

// https://en.wikipedia.org/wiki/Baker%27s_map
function bakerFolded(points) {
    for (let p of points) {
        let x = (p.x < 1/2) ? (2*p.x) : (2-2*p.x);
        let y = (p.x < 1/2) ? (p.y/2) : (1-p.y/2);
        p.x = x;
        p.y = y;
    }
}
function bakerUnfolded(points) {
    for (let p of points) {
        let x = 2*p.x-floor(2*p.x);
        let y = (p.y+floor(2*p.x))/2;
        p.x = x;
        p.y = y;
    }
}

// https://en.wikipedia.org/wiki/Arnold%27s_cat_map
function arnoldsCat(points) {
    for (let p of points) {
        let x = (2*p.x+p.y)%1;
        let y = (p.x+p.y)%1;
        p.x = x;
        p.y = y;
    }
}

// https://en.wikipedia.org/wiki/File:Chaos_Sensitive_Dependence.svg
// https://en.wikipedia.org/wiki/File:LogisticTopMixing1-6.gif
// https://en.wikipedia.org/wiki/File:Chaos_Topological_Mixing.png
function logistic(points) {
    for (let p of points) {
        let x = 4*p.x*(1-p.x);
        let y = (p.x+p.y < 1) ? (p.x+p.y) : (p.x+p.y-1);
        p.x = x;
        p.y = y;
    }
}