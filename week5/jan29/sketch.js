/*
Genuary 2024
JAN.29 "Signed Distance Functions (if we keep trying once per year, eventually we will be good at it!)."
By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noStroke();
    noLoop();
}

function draw() {
    background(5);

    let margin = 10;
    let n = ~~random(2, 6);
    n = 5
    let s = (width-2*margin)/n;

    let r = 0.8;
    let vertices1 = [], vertices2 = [];;
    let nPoints = 6, theta1 = 0, theta2 = TAU/(2*nPoints);
    if (random() < 10/2) [theta1, theta2] = [theta2, theta1];
    for (let theta = 0; theta < TAU-0.001; theta += TAU/nPoints) {
        let x1 = r*cos(theta+theta1), y1 = r*sin(theta+theta1);
        vertices1.push([x1, y1]);
        let x2 = r*cos(theta+theta2), y2 = r*sin(theta+theta2);
        vertices2.push([x2, y2]);
    }

    let col1 = 250, col2 = rainbow(29/31);
    if (random() < 10/2) [col1, col2] = [col2, col1];

    for (let i = 0; i < n; i++) {
        let x = margin + i*s;
        for (let j = 0; j < n; j++) {
            let y = margin + j*s;
            makeTile(x, y, s, vertices1, vertices2, col1, col2, (i+j)/(2*n-2));
        }
    }
}

function makeTile(x0, y0, s, vertices1, vertices2, col1, col2, prob) {
    let u = s/30;
    for (let x1 = u/2; x1 < s; x1 += u) {
        for (let y1 = u/2; y1 < s; y1 += u) {
            let chosen1 = random() < prob;

            let v = chosen1 ? vertices1 : vertices2;
            let px = 2*x1/s-1, py = 2*y1/s-1;
            let sdf = sdPolygon(v, [px, py]);

            let x = x0+x1, y = y0+y1;
            let d = sdf < 0 ? u*0.9 : u*0.5;

            fill((sdf > 0 == chosen1) ? col1 : col2);
            circle(x, y, d);
        }
    }
}

function dot(a, b) {
    let n = a.length;
    if (b.length != n) return undefined;
    let d = 0;
    for (let i = 0; i < n; i++) {
        d += a[i]*b[i];
    }
    return d;
}

function all(a, b, c) {
    return a && b && c;
}

// adapted from https://iquilezles.org/articles/distfunctions2d/
function sdPolygon(v, p) {
    let p_minus_v0 = [p[0]-v[0][0], p[1]-v[0][1]];
    let d = dot(p_minus_v0, p_minus_v0);
    let s = 1;
    let N = v.length;
    for (let i = 0, j = N-1; i < N; j = i, i++) {
        let e = [v[j][0]-v[i][0], v[j][1]-v[i][1]];
        let w = [p[0]-v[i][0], p[1]-v[i][1]];
        let val = constrain(dot(w, e)/dot(e, e), 0, 1);
        let b = [w[0]-e[0]*val, w[1]-e[1]*val];
        d = min(d, dot(b, b));
        let c1 = p[1] >= v[i][1];
        let c2 = p[1] < v[j][1];
        let c3 = e[0]*w[1] > e[1]*w[0];
        if (all(c1, c2, c3) || all(!c1, !c2, !c3)) s *= -1;
    }
    return s*sqrt(d);
    /*
    float d = dot(p-v[0],p-v[0]);
    float s = 1.0;
    for( int i=0, j=N-1; i<N; j=i, i++ )
    {
        vec2 e = v[j] - v[i];
        vec2 w =    p - v[i];
        vec2 b = w - e*clamp( dot(w,e)/dot(e,e), 0.0, 1.0 );
        d = min( d, dot(b,b) );
        bvec3 c = bvec3(p.y>=v[i].y,p.y<v[j].y,e.x*w.y>e.y*w.x);
        if( all(c) || all(not(c)) ) s*=-1.0;  
    }
    return s*sqrt(d);
    */
}