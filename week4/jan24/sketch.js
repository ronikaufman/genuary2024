/*
Genuary 2024
JAN.24 "Impossible objects (undecided geometry)."
By Roni Kaufman
https://ronikaufman.github.io
*/

let randInt = (a, b) => (floor(random(a, b))); 

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noLoop();
}

function draw() {
    let colOfTheDay = rainbow(24/31)
    background(colOfTheDay);

    noFill();
    strokeWeight(2);

    let n = 6, margin = random([-1, 1]);
    let u = width/n, gap = u/4;
    let squares = shuffle([...createComposition(n, margin, 0), ...createComposition(n-1, margin, u/2)]);
    let emptyOffset = random([0, u/2]);
    for (let squ of squares) {
        let x = squ.i*u+gap/2+squ.offset;
        let y = squ.j*u+gap/2+squ.offset;
        let s = squ.s*u-gap;
        if (squ.offset == emptyOffset) {
            impossibleSquare(x, y, s, gap/3, colOfTheDay, colOfTheDay);
            impossibleSquareOutline(x, y, s, gap/3, 0);
        } else {
            impossibleSquare(x, y, s, gap/3, 255, 0);
            impossibleSquareOutline(x, y, s, gap/3, 0);
        }
    }
}

function createComposition(n, margin, offset) {
    let squares = [];

	for (let i = 0; i < 1000; i++) {
        let newSqu = generateSquare(n, margin, offset);
        let canAdd = true;
        for (let squ of squares) {
            if (squaresIntersect(newSqu, squ)) {
                canAdd = false;
                break;
            }
        }
        if (canAdd) {
            squares.push(newSqu);
        }
    }

    return squares;
}

function squaresIntersect(squ1, squ2) {
	return ((squ1.i <= squ2.i && squ1.i+squ1.s > squ2.i) || (squ2.i <= squ1.i && squ2.i+squ2.s > squ1.i)) && ((squ1.j <= squ2.j && squ1.j+squ1.s > squ2.j) || (squ2.j <= squ1.j && squ2.j+squ2.s > squ1.j))
}

function generateSquare(n, margin, offset) {
    let s = randInt(1, 4);
    let i = randInt(margin, n-margin-s+1);
    let j = randInt(margin, n-margin-s+1);
    let squ = {
        i: i,
        j: j,
        s: s,
        offset: offset
    };
    return squ;
}

function impossibleSquareOutline(x, y, s, th, col) {
    stroke(col);
    line(x, y-th, x+s, y-th);
    line(x+s, y-th, x+s+th, y);
    line(x+s+th, y, x+s+th, y+s);
    line(x+s+th, y+s, x+s, y+s+th);
    line(x+s, y+s+th, x, y+s+th);
    line(x, y+s+th, x-th, y+s);
    line(x-th, y+s, x-th, y);
    line(x-th, y, x, y-th);

    line(x, y-th, x, y+s-th);
    line(x+s+th, y, x+th, y);
    line(x+s, y+s+th, x+s, y+th);
    line(x-th, y+s, x+s-th, y+s);

    line(x+th, y, x+th, y+s-th);
    line(x+s, y+th, x+th, y+th);
    line(x+s-th, y+s, x+s-th, y+th);
    line(x, y+s-th, x+s-th, y+s-th);
}

function impossibleSquare(x, y, s, th, col1, col2) {
    noStroke();
    fill(col1);
    beginShape();
    vertex(x, y-th);
    vertex(x, y+s-th);
    vertex(x+s-th, y+s-th);
    vertex(x+s-th, y+s);
    vertex(x-th, y+s);
    vertex(x-th, y);
    endShape(CLOSE);
    beginShape();
    vertex(x+s, y+s+th);
    vertex(x+s, y+th);
    vertex(x+th, y+th);
    vertex(x+th, y);
    vertex(x+s+th, y);
    vertex(x+s+th, y+s);
    endShape(CLOSE);

    fill(col2);
    beginShape();
    vertex(x+s+th, y);
    vertex(x+th, y);
    vertex(x+th, y+s-th);
    vertex(x, y+s-th);
    vertex(x, y-th);
    vertex(x+s, y-th);
    endShape(CLOSE);
    beginShape();
    vertex(x-th, y+s);
    vertex(x+s-th, y+s);
    vertex(x+s-th, y+th);
    vertex(x+s, y+th);
    vertex(x+s, y+s+th);
    vertex(x, y+s+th);
    endShape(CLOSE);
}