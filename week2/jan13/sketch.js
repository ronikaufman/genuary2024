/*
Genuary 2024
JAN.13 "Wobbly function day."
By Roni Kaufman
https://ronikaufman.github.io
*/

let col;

let N = 16;
let u, sw;
let rectangles = [];
let randInt = (a, b) => (floor(random(a, b))); 

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noLoop();

    col = rainbow(13/31);

    u = width/N;
	sw = u/8;
    createComposition();
	createConnections();
    let fillingTypes = ["b", "w", "p", "b*", "w*", "p*"];
    DSatur("filling", fillingTypes);
}

function draw() {
    for (let recta of rectangles) {
        fill(random(255));
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
	for (let i = 0; i < N; i++) {
		for (let j = 0; j < N; j++) {
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
    let si = randInt(1.5, 6);
    let sj = randInt(1.5, 6);
    let i = randInt(0, N-si+1);
    let j = randInt(0, N-sj+1);
    let recta = {
        i: i,
        j: j,
        si: si,
        sj: sj,
		neighbors: []
  };
  return recta;
}

// creating the graph

function createConnections() {
	let l = rectangles.length;
	for (let i = 0; i < l; i++) {
		let recta1 = rectangles[i];
		for (let j = 0; j < l; j++) {
			let recta2 = rectangles[j];
			if (i != j && rectanglesTouch(recta1, recta2)) {
				recta1.neighbors.push(recta2);
				//recta2.neighbors.push(recta1);
			}
		}
	}
}

function rectanglesTouch(recta1, recta2) {
	if (((recta1.i <= recta2.i && recta1.i+recta1.si == recta2.i) || (recta2.i <= recta1.i && recta2.i+recta2.si == recta1.i)) && ((recta1.j <= recta2.j && recta1.j+recta1.sj > recta2.j) || (recta2.j <= recta1.j && recta2.j+recta2.sj > recta1.j)))
		return true;
	if (((recta1.i <= recta2.i && recta1.i+recta1.si > recta2.i) || (recta2.i <= recta1.i && recta2.i+recta2.si > recta1.i)) && ((recta1.j <= recta2.j && recta1.j+recta1.sj == recta2.j) || (recta2.j <= recta1.j && recta2.j+recta2.sj == recta1.j)))
		return true;
	return false;
}

// coloring the graph

function DSatur(el, elements) {
	// from https://en.wikipedia.org/wiki/DSatur
	
	for (let i = 0; i < rectangles.length; i++) {
		// step 1
		let v, vSat = -1, vElementsUsed;
		for (let recta of rectangles) {
			if (!recta[el]) {
				let elementsUsed = elementsUsedByNeighbors(recta, el);
				let sat = elementsUsed.length;
				if (sat > vSat) {
					v = recta;
					vSat = sat;
					vElementsUsed = elementsUsed;
				} else if (sat == vSat) {
					if (largestDegreeInTheSubgraphInducedByTheUncoloredVertices(recta, el) > largestDegreeInTheSubgraphInducedByTheUncoloredVertices(v, el)) {
						v = recta;
						vSat = sat;
						vElementsUsed = elementsUsed;
					}
				}
			}
		}

		// step2
		shuffle(elements, true);
		for (let element of elements) {
			if (vElementsUsed.indexOf(element) == -1) {
				v[el] = element;
				break;
			}
		}
	}
}

function elementsUsedByNeighbors(v, el) {
	let elementsUsed = [];
	for (let neigh of v.neighbors) {
		if (neigh[el]) elementsUsed.push(neigh[el]);
	}
	return [...new Set(elementsUsed)];
}

function largestDegreeInTheSubgraphInducedByTheUncoloredVertices(v, el) {
	let largestDegree = -1;
	for (let neigh of v.neighbors) {
		if (!neigh[el]) {
			let sat = elementsUsedByNeighbors(neigh, el);
			if (sat > largestDegree) largestDegree = sat;
		}
	}
	return largestDegree;
}

// drawing

function drawRectangle(recta) {
	let x0 = recta.i*u, y0 = recta.j*u;
	let w = recta.si*u, h = recta.sj*u;
    let fillingType = recta.filling;

    let tile = createGraphics(w, h);
    switch (fillingType.charAt(0)) {
        case "b":
            tile.background(5);
            break;
        case "w":
            tile.background(250);
            break;
        case "p":
            tile.background(col);
    }

    tile.noFill();
    if (fillingType.length > 1) {
        switch (fillingType.charAt(0)) {
            case "b":
                tile.stroke(random([250, col]));
                break;
            case "w":
                tile.stroke(random([col, 5]));
                break;
            case "p":
                tile.stroke(random([5, 250]));
        }
        makeSpiral(tile);
    }

    image(tile, x0, y0);
    tile.remove();
}

function makeSpiral(tile) {
    let rMax = sqrt(sq(tile.width/2)+sq(tile.height/2));
    let dir = random([1, -1]);
    let offset1 = randInt(0, 10);
    let offset2 = randInt(0, 10);
    let offset3 = randInt(0, 10);
    let offset4 = randInt(0, 10);

    let r = 0, theta = 0;
    let nSteps = 1000;
    let rGap = random(3, 7);
    let rStep = 2*rGap/nSteps;
    let thetaStep = TAU/nSteps;
    tile.beginShape();
    while (r < rMax) {
        let t = dir*sq(r);
        let rOff = (sin(3*t+offset1)/3 + sin(5*t+offset2)/5 + sin(8*t+offset3)/8 + sin(13*t+offset4)/13)*rGap/2;
        rOff += noise(1+cos(theta), 1+sin(theta), offset1+offset2+offset3+offset4)*rGap;
        if (r < 2*rGap) rOff *= map(r, 0, 2*rGap, 0, 1);
        tile.vertex(tile.width/2 + (r+rOff)*cos(theta), tile.height/2 + (r+rOff)*sin(theta));

        theta += thetaStep;
        r += rStep;
    }
    tile.endShape();
}