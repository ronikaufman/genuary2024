/*
Genuary 2024
JAN.22 "Use a library that you haven’t used before."
By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noLoop();
    strokeCap(SQUARE);
}

function draw() {
    background(rainbow(22/31));

    let margin = 10;
    let gap = 10;
    let circles = [{
        x: width/2,
        y: height/2,
        r: gap
    }];

    // planes and points
    stroke(0);
    strokeWeight(1);
    for (let i = 0; i < 1000; i++) {
        let x0 = random(margin, width-margin);
        let y0 = random(margin, height-margin);

        let rMax = smallestDistToOtherCircles(x0, y0, circles, 80);
        if (rMax > 20) {
            circles.push({
                x: x0,
                y: y0,
                r: rMax
            });

            if (rMax > 30) drawPlane(x0, y0, rMax-gap);
            else drawPoint(x0, y0, rMax-gap);
        }
    }

    // lines
    let dMin = 50; // minimum length of a line
    let r = 20; // space taken by 1 line
    strokeWeight(2);
    for (let i = 0; i < 1000; i++) {
        let x0 = random(margin, width-margin);
        let y0 = random(margin, height-margin);

        if (pointInsideCircles(x0, y0, circles)) continue;
        circles.push({
            x: x0,
            y: y0,
            r: r
        });

        let theta0 = atan2(y0-height/2, x0-width/2);
        //theta0 = random(TAU)
        let d = dMin, x1, y1;
        while (d < 100) {
            let thetaOffSet = random(-TAU/20, TAU/20);
            x1 = x0 + d/2*cos(theta0+thetaOffSet);
            y1 = y0 + d/2*sin(theta0+thetaOffSet);
            let rMax = smallestDistToOtherCircles(x1, y1, circles, width);
            if (rMax < 1) break;
            if (x1 < margin || x1 > width-margin || y1 < margin || y1 > height-margin) break;
            d++;
        }

        if (d > dMin) {
            for (let t = 0; t < 1; t += 0.1) {
                let [x10, y10] = lerpPoints(x1, y1, x0, y0, t);
                circles.push({
                    x: x10,
                    y: y10,
                    r: r
                });
            }

            drawLine(x0, y0, x1, y1);
        }
    }
}

function lerpPoints(xStart, yStart, xStop, yStop, amt) {
    return [xStart*(1-amt)+xStop*amt, yStart*(1-amt)+yStop*amt];
}

function smallestDistToOtherCircles(x0, y0, circles, maxVal) {
    let dMin = min([x0, y0, width-x0, height-y0, maxVal]);
    for (let c of circles) {
        let d = dist(x0, y0, c.x, c.y) - c.r;
        if (d < dMin) {
            dMin = d;
        }
    }
    return dMin;
}

function pointInsideCircles(x, y, circles) {
    for (let c of circles) {
        let d = dist(x, y, c.x, c.y);
        if (d < c.r) {
            return true;
        }
    }
    return false;
}

function drawPlane(x, y, r) {
    let theta0 = random(TAU);
    let thetaOffset1 = random(PI/6, PI/3);
    let thetaOffset2 = random(PI/6, PI/3);
    if (thetaOffset2 > thetaOffset1) [thetaOffset1, thetaOffset2] = [thetaOffset2, thetaOffset1];
    let theta1 = theta0 + thetaOffset1;
    let theta2 = theta0 - thetaOffset1;
    let theta3 = theta0 + PI + thetaOffset2;
    let theta4 = theta0 + PI - thetaOffset2;

    let x1 = x + r*cos(theta1), y1 = y + r*sin(theta1);
    let x2 = x + r*cos(theta2), y2 = y + r*sin(theta2);
    let x3 = x + r*cos(theta3), y3 = y + r*sin(theta3);
    let x4 = x + r*cos(theta4), y4 = y + r*sin(theta4);

    fill(255);
    stroke(0);
    quad(x1, y1, x2, y2, x3, y3, x4, y4);

    fill(0);
    let m = ~~random(2, 10), n = random() < 1/2 ? m : ~~random(2, 10);
    for (let i = 0; i < m; i++) {
        let ti = i/m;
        for (let j = 0; j < n; j++) {
            let tj = j/n;
            if ((i+j) % 2 == 0) continue;

            let [x12a, y12a] = lerpPoints(x1, y1, x2, y2, ti);
            let [x12b, y12b] = lerpPoints(x1, y1, x2, y2, ti+1/m);
            let [x43a, y43a] = lerpPoints(x4, y4, x3, y3, ti);
            let [x43b, y43b] = lerpPoints(x4, y4, x3, y3, ti+1/m);

            let [x5, y5] = lerpPoints(x12a, y12a, x43a, y43a, tj);
            let [x6, y6] = lerpPoints(x12b, y12b, x43b, y43b, tj);
            let [x7, y7] = lerpPoints(x12b, y12b, x43b, y43b, tj+1/n);
            let [x8, y8] = lerpPoints(x12a, y12a, x43a, y43a, tj+1/n);
            
            quad(x5, y5, x6, y6, x7, y7, x8, y8);
        }
    }
}

function drawPoint(x0, y0, r) {
    noStroke();
    fill(random([0, 255]));
    circle(x0, y0, 2*r);
}

function drawLine(x0, y0, x1, y1) {
    stroke(random([0, 255]));
    line(x0, y0, x1, y1);
}