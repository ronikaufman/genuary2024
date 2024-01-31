/*
Genuary 2024
JAN.31 "Generative music / Generative audio / Generative sound."
By Roni Kaufman
https://ronikaufman.github.io
*/

let N = 8;
let margin = 1;
let u, keySize;
let rectangles = [];
let randInt = (a, b) => (floor(random(a, b))); 

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noStroke();
    noLoop();

    u = width/N;
    keySize = u/6;
    createComposition();
}

function draw() {
    background(rainbow(31/31));

    for (let recta of rectangles) {
        drawRectangle(recta);
    }
}


// creating the composition

function createComposition() {
	for (let i = 0; i < 2000; i++) {
        let newRecta = generateRectangle();
        let canAdd = true;
        for (let recta of rectangles) {
            if (rectanglesIntersect(newRecta, recta)) {
                canAdd = false;
                break;
            }
        }
        if (canAdd) {
            rectangles.push(newRecta);
        }
    }
  
    // fill the gaps with 1x1 rectangles
	for (let i = margin; i < N-margin; i++) {
		for (let j = margin; j < N-margin; j++) {
			let newRecta = {
				i: i,
				j: j,
				si: 1,
				sj: 1,
				neighbors: []
			}
			let canAdd = true;
			for (let recta of rectangles) {
				if (rectanglesIntersect(newRecta, recta)) {
					canAdd = false;
					break;
				}
			}
			if (canAdd) {
				rectangles.push(newRecta);
			}
		}
	}
}

function rectanglesIntersect(recta1, recta2) {
	return ((recta1.i <= recta2.i && recta1.i+recta1.si > recta2.i) || (recta2.i <= recta1.i && recta2.i+recta2.si > recta1.i)) && ((recta1.j <= recta2.j && recta1.j+recta1.sj > recta2.j) || (recta2.j <= recta1.j && recta2.j+recta2.sj > recta1.j));
}

function generateRectangle() {
    let si = 1;
    let sj = randInt(2, N-2*margin);
    if (random() < 1/2) [si, sj] = [sj, si];
    let i = randInt(margin, N-margin-si+1);
    let j = randInt(margin, N-margin-sj+1);
    let recta = {
        i: i,
        j: j,
        si: si,
        sj: sj,
		neighbors: []
  };
  return recta;
}

// drawing

function drawRectangle(recta) {
	let x0 = recta.i*u + keySize/2, y0 = recta.j*u + keySize/2;
	let w = recta.si*u - keySize, h = recta.sj*u - keySize;
    let gap = keySize/5;

    let idx = random([0, 3]);
    let invert = random() < 1/2;
    if (w > h || (w == h && random() < 1/2)) {
        let n = ~~(w/keySize);
        for (let i = 0; i < n; i++) {
            let x = x0 + i*keySize;
            fill(200);
            for (let z = keySize/2; z > 0; z -= gap/5) {
                rect(x+gap/2+z, y0+gap/2+z, keySize-gap, h-gap, gap);
            }
            fill(250);
            rect(x+gap/2, y0+gap/2, keySize-gap, h-gap, gap);
            if (i > 0 && (i+idx)%7 != 0 && (i+idx)%7 != 3) {
                fill(5);
                if (invert) rect(x+gap-keySize/2, y0+gap/2, keySize-2*gap, h*2/3-gap, gap);
                else rect(x+gap-keySize/2, y0+gap/2+h/3, keySize-2*gap, h*2/3-gap, gap);
            }
        }
    } else {
        let n = ~~(h/keySize);
        for (let j = 0; j < n; j++) {
            let y = y0 + j*keySize;
            fill(200);
            for (let z = keySize/2; z > 0; z -= gap/5) {
                rect(x0+gap/2+z, y+gap/2+z, w-gap, keySize-gap, gap);
            }
            fill(250);
            rect(x0+gap/2, y+gap/2, w-gap, keySize-gap, gap);
            if (j > 0 && (j+idx)%7 != 0 && (j+idx)%7 != 3) {
                fill(5);
                if (invert) rect(x0+gap/2, y+gap-keySize/2, w*2/3-gap, keySize-2*gap, gap);
                else rect(x0+gap/2+w/3, y+gap-keySize/2, w*2/3-gap, keySize-2*gap, gap);
            }
        }
    }
}