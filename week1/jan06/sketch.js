/*
Genuary 2024
JAN.6 "Screensaver."
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
    background(0);

    let n = 12;
    let pipes = createPipes(n);
    
    lights();
    shininess(1);
    emissiveMaterial(0);
    specularMaterial(rainbow(6/31));

    let s = width/n;
    let radius = s/12;
    translate(s/2, s/2, s/2);

    let shades = [];
    let nPipes = pipes.length;
    for (let a = 0; a < nPipes; a++) {
        shades.push(255*a/(nPipes-1));
    }

    for (let pi of pipes) {
        fill(shades.pop());
        for (let a = 0; a < pi.length-1; a++) {
            let [i1, j1, k1] = pi[a];
            let [i2, j2, k2] = pi[a+1];
            let x1 = (i1-n/2)*s, y1 = (j1-n/2)*s, z1 = (k1-n/2)*s;
            let x2 = (i2-n/2)*s, y2 = (j2-n/2)*s, z2 = (k2-n/2)*s;

            let sphere1 = random() < 1/3;
            if (a > 0) {
                let [i0, j0, k0] = pi[a-1];
                if ((equal(i0, i1, i2) && equal(j0, j1, j2)) || (equal(j0, j1, j2) && equal(k0, k1, k2)) || (equal(k0, k1, k2) && equal(i0, i1, i2))) {
                    sphere1 = false;
                }
            } else {
                sphere1 = true;
            }

            let sphere2 = false;
            if (a == pi.length-1) {
                sphere2 = true;
            }

            pipeSegment(x1, y1, z1, sphere1, x2, y2, z2, sphere2, radius);
        }
    }
}

function createPipes(n) {
    let pipes = [];
    let freeSpots = Array(n).fill(true).map(e => Array(n).fill(true).map(e => Array(n).fill(true)));

    // starting points
    for (let a = 0; a < 4; a++) {
        let i = ~~random(n), j = ~~random(n), k = ~~random(n);
        let canAdd = true;
        for (let pi of pipes) {
            let i1 = pi[0][0], j1 = pi[0][1], k1 = pi[0][2];
            if ((i == i1) && (j == j1) && (k == k1)) {
                canAdd = false;
                break;
            }
        }
        if (canAdd) {
            pipes.push([[i, j, k]]);
            freeSpots[i][j][k] = false;
        }
    }

    // growing
    let growing = true;
    while (growing) {
        growing = false;
        for (let pi of pipes) {
            let extremity = pi[pi.length-1];
            let [ie, je, ke] = extremity;
            let neighbors = [];
            if (ie > 0) {
                if (freeSpots[ie-1][je][ke]) neighbors.push([ie-1, je, ke]);
            }
            if (ie < n-1) {
                if (freeSpots[ie+1][je][ke]) neighbors.push([ie+1, je, ke]);
            }
            if (je > 0) {
                if (freeSpots[ie][je-1][ke]) neighbors.push([ie, je-1, ke]);
            }
            if (je < n-1) {
                if (freeSpots[ie][je+1][ke]) neighbors.push([ie, je+1, ke]);
            }
            if (ke > 0) {
                if (freeSpots[ie][je][ke-1]) neighbors.push([ie, je, ke-1]);
            }
            if (ke < n-1) {
                if (freeSpots[ie][je][ke+1]) neighbors.push([ie, je, ke+1]);
            }
            if (neighbors.length > 0) {
                // pipe can keep growing
                let nextPoint = random(neighbors);
                pi.push(nextPoint);
                freeSpots[nextPoint[0]][nextPoint[1]][nextPoint[2]] = false;
                growing = true;
            }
        }
    }

    return pipes;
}

function equal(a, b, c) {
    return (a == b && b == c);
}

function pipeSegment(x1, y1, z1, sphere1, x2, y2, z2, sphere2, radius) {
    push();
    translate(x1, y1, z1);
    sphere(radius*(sphere1 ? 1.5 : 1));
    pop();

    push();
    translate((x1+x2)/2, (y1+y2)/2, (z1+z2)/2);
    if (x1 != x2 && y1 == y2 && z1 == z2) rotateZ(PI/2);
    if (x1 == x2 && y1 != y2 && z1 == z2) rotateY(PI/2);
    if (x1 == x2 && y1 == y2 && z1 != z2) rotateX(PI/2);
    let ch = dist(x1, y1, z1, x2, y2, z2);
    cylinder(radius, ch);
    pop();

    push();
    translate(x2, y2, z2);
    sphere(radius*(sphere2 ? 1.5 : 1));
    pop();
}