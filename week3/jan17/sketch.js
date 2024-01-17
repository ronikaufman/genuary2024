/*
Genuary 2024
JAN.17 "Inspired by Islamic art."
By Roni Kaufman
https://ronikaufman.github.io
*/

let colOfTheDay;

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noLoop();
    strokeJoin(ROUND);
    strokeCap(PROJECT);

    colOfTheDay = rainbow(17/31);
}

function draw() {
    background(colOfTheDay);
    translate(width/2, height/2);
    rotate(random([0, PI/2, PI, 3*PI/2]));

    let shapes = [
        {
            vertices: [
                [-width/2, -height/2],
                [width/2, -height/2],
                [width/2, height/2],
                [-width/2, height/2]
            ],
            type: "square"
        }
    ]; // start with central square

    let s = width;
    let h = s/sqrt(2);
    let nSteps = random([3, 4]);
    for (let k = 0; k < nSteps; k++) {
        let nextShapes = [];
        let nextS = s/(1+sqrt(2));
        let nextH = nextS/sqrt(2);

        for (let sh of shapes) {
            let newShapes = (sh.type == "rhombus") ? subdivideRhombus(sh.vertices, s, h, nextS, nextH) : subdivideSquare(sh.vertices, s, h, nextS, nextH);

            for (let newSh of newShapes) {
                if (inCanvas(newSh.vertices) && !isDuplicate(newSh, nextShapes)) {
                    nextShapes.push(newSh);
                }
            }
        }

        shapes = [...nextShapes];
        s = nextS;
        h = nextH;
    }
    strokeWeight(s/10);

    let contrastCols = shuffle([5, 250]);
    for (let sh of shapes) {
        if (sh.type == "rhombus") {
            fill(contrastCols[0]);
        } else {
            fill(colOfTheDay);
        }
        stroke(120);
        beginShape();
        for (let v of sh.vertices) {
            vertex(v[0], v[1]);
        }
        endShape(CLOSE);

        noFill();
        stroke(contrastCols[1]);
        if (sh.type == "rhombus") {
            rhombusTruchet(sh.vertices, s);
        } else {
            squareTruchet(sh.vertices, s);
        }
    }
}

function subdivideRhombus([[xA, yA], [xB, yB], [xC, yC], [xD, yD]], s, h, nextS, nextH) {
    let vjx = (xD-xA)/s, vjy = (yD-yA)/s;
    let vix = vjx*cos(-PI/2) - vjy*sin(-PI/2);
    let viy = vjx*sin(-PI/2) + vjy*cos(-PI/2);

    let xE = xB - vix*nextS, yE = yB - viy*nextS;
    let xF = xD + vix*nextS, yF = yD + viy*nextS;

    let xG = xE - vjx*nextS, yG = yE - vjy*nextS;
    let xH = xG + vix*nextS, yH = yG + viy*nextS;

    let xI = xF + vix*2*nextH, yI = yF + viy*2*nextH;
    let xJ = xB + vjx*2*nextH, yJ = yB + vjy*2*nextH;

    let xK = xF + vjx*nextS, yK = yF + vjy*nextS;
    let xL = xD + vjx*nextS, yL = yD + vjy*nextS;

    let xM = xE - vix*2*nextH, yM = yE - viy*2*nextH;
    let xN = xD - vjx*2*nextH, yN = yD - vjy*2*nextH;

    let newShapes = [
        {
            vertices: [
                [xA, yA],
                [xG, yG],
                [xE, yE],
                [xN, yN]
            ],
            type: "rhombus"
        },
        {
            vertices: [
                [xB, yB],
                [xF, yF],
                [xD, yD],
                [xE, yE]
            ],
            type: "rhombus"
        },
        {
            vertices: [
                [xF, yF],
                [xJ, yJ],
                [xC, yC],
                [xK, yK]
            ],
            type: "rhombus"
        },
        {
            vertices: [
                [xG, yG],
                [xH, yH],
                [xB, yB],
                [xE, yE]
            ],
            type: "square"
        },
        {
            vertices: [
                [xJ, yJ],
                [xF, yF],
                [xB, yB],
                [xI, yI]
            ],
            type: "square"
        },
        {
            vertices: [
                [xK, yK],
                [xL, yL],
                [xD, yD],
                [xF, yF]
            ],
            type: "square"
        },
        {
            vertices: [
                [xN, yN],
                [xE, yE],
                [xD, yD],
                [xM, yM]
            ],
            type: "square"
        }
    ];

    return newShapes;
}

function subdivideSquare([[xA, yA], [xB, yB], [xC, yC], [xD, yD]], s, h, nextS, nextH) {
    let x0 = (xA+xB+xC+xD)/4, y0 = (yA+yB+yC+yD)/4;
    let vix = (xB-x0)/h, viy = (yB-y0)/h;
    let vjx = (xC-x0)/h, vjy = (yC-y0)/h;

    let xE = x0 - vjx*nextH, yE = y0 - vjy*nextH;
    let xF = x0 + vix*nextH, yF = y0 + viy*nextH;
    let xG = x0 + vjx*nextH, yG = y0 + vjy*nextH;
    let xH = x0 - vix*nextH, yH = y0 - viy*nextH;

    let xI = xA + vix*nextS, yI = yA + viy*nextS;
    let xJ = xI + vjx*nextS, yJ = yI + vjy*nextS;

    let xK = xB + vjx*nextS, yK = yB + vjy*nextS;
    let xL = xK - vix*nextS, yL = yK - viy*nextS;
    
    let xN = xD + vjx*nextS, yN = yD + vjy*nextS;
    let xM = xN + vix*nextS, yM = yN + viy*nextS;

    let xP = xA - vix*nextS, yP = yA - viy*nextS;
    let xO = xP + vjx*nextS, yO = yP + vjy*nextS;

    let newShapes = [
        {
            vertices: [
                [xE, yE],
                [xJ, yJ],
                [xB, yB],
                [xF, yF]
            ],
            type: "rhombus"
        },
        {
            vertices: [
                [xE, yE],
                [xH, yH],
                [xD, yD],
                [xO, yO]
            ],
            type: "rhombus"
        },
        {
            vertices: [
                [xF, yF],
                [xL, yL],
                [xC, yC],
                [xG, yG]
            ],
            type: "rhombus"
        },
        {
            vertices: [
                [xH, yH],
                [xG, yG],
                [xC, yC],
                [xM, yM]
            ],
            type: "rhombus"
        },
        {
            vertices: [
                [xJ, yJ],
                [xE, yE],
                [xA, yA],
                [xI, yI]
            ],
            type: "square"
        },
        {
            vertices: [
                [xO, yO],
                [xP, yP],
                [xA, yA],
                [xE, yE]
            ],
            type: "square"
        },
        {
            vertices: [
                [xL, yL],
                [xF, yF],
                [xB, yB],
                [xK, yK]
            ],
            type: "square"
        },
        {
            vertices: [
                [xM, yM],
                [xN, yN],
                [xD, yD],
                [xH, yH]
            ],
            type: "square"
        },
        {
            vertices: [
                [xG, yG],
                [xH, yH],
                [xE, yE],
                [xF, yF]
            ],
            type: "square"
        }
    ];

    return newShapes;
}

// a shape is inside the canvas if at least one its point are inside
function inCanvas(vertices) {
    return pointIsInside(vertices[0]) || pointIsInside(vertices[1]) || pointIsInside(vertices[2]) || pointIsInside(vertices[3]);
}

// a point is inside the canvas if both coordinates are inside
function pointIsInside([x, y]) {
    return x > -width/2 && x < width/2 && y > -height/2 && y < height/2;
} // well, well, look who's inside again...

// check if one element of shapes equals newShape
function isDuplicate(newShape, shapes) {
    return shapes.some(
        sh => {
            if (newShape.vertices.every(
                v1 => {
                    for (let v2 of sh.vertices) {
                        if (abs(v1[0]-v2[0]) < 1 && abs(v1[1]-v2[1]) < 1) {
                            return true;
                        }
                    }
                    return false;
                }
            )) return true;
        }
    );
}

function rhombusTruchet([[xA, yA], [xB, yB], [xC, yC], [xD, yD]], s) {
    if (random() < 1/2) {
        let theta = atan2(yB-yA, xB-xA);
        arc(xA, yA, s, s, theta, theta+PI/4);
        arc(xC, yC, s, s, theta+PI, theta+5*PI/4);
    } else {
        let theta = atan2(yC-yB, xC-xB);
        arc(xB, yB, s, s, theta, theta+3*PI/4);
        arc(xD, yD, s, s, theta+PI, theta+7*PI/4);
    }
}

function squareTruchet([[xA, yA], [xB, yB], [xC, yC], [xD, yD]], s) {
    if (random() < 1/2) {
        let theta = atan2(yB-yA, xB-xA);
        arc(xA, yA, s, s, theta, theta+PI/2);
        arc(xC, yC, s, s, theta+PI, theta+3*PI/2);
    } else {
        let theta = atan2(yC-yB, xC-xB);
        arc(xB, yB, s, s, theta, theta+PI/2);
        arc(xD, yD, s, s, theta+PI, theta+3*PI/2);
    }
}