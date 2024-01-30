/*
Genuary 2024
JAN.30 "Shaders."
By Roni Kaufman
https://ronikaufman.github.io
*/

let theShader;
let rot, nSteps, t0;
let colRed, colGreen, colBlue;

function preload() {
    theShader = new p5.Shader(this.renderer, vert, frag);
}

function setup() {
    createCanvas(500, 500, WEBGL);
    pixelDensity(3);
    noStroke();

    let colOfTheDay = rainbow(30/31);
    colRed = red(colOfTheDay)/255;
    colGreen = green(colOfTheDay)/255;
    colBlue = blue(colOfTheDay)/255;

    rot = random([0, PI/2, PI, 3*PI/2]);
    nSteps = 2*~~random(5, 12);
    t0 = random();
}

function draw() {
    rotate(rot);
    let sw = 1;
    strokeWeight(sw);
    stroke(255);
    scale(1+sw/width);
  
    theShader.setUniform("u_resolution", [width / 1, height / 1]);

    let s = width/nSteps;
    let depth = s/2;
    let z = depth-width*3/2;
    let t = t0;
    for (let i = nSteps; i > 1; i -= 2) {
        t = staircase(z, z, 2*i*s, i, depth, t);
        z += 4*s;
    }
}

function staircase(x0, y0, s, nDivs, depth, t) {
    let frontShape = [[x0, y0+s]];
    let leftVertices = [];
    let upVertices = [];

    let u = s/nDivs;
    let x = x0, y = y0+s-u;
    for (let i = 0; i < nDivs; i++) {
        frontShape.push([x, y]);
        frontShape.push([x+u, y]);
        leftVertices.push([[x, y], [x, y+u], [x-depth, y+u-depth], [x-depth, y-depth]]);
        upVertices.push([[x, y], [x-depth, y-depth], [x+u-depth, y-depth], [x+u, y]]);
        x += u;
        y -= u;
    }
    frontShape.push([x0+s, y0+s]);

    let col1 = 0.9, col2 = 0.1;
    shadedPolygon(frontShape, col1, col1, col1, col2, col2, col2, t);

    for (let vertices of leftVertices) {
        t++;
        shadedPolygon(vertices, col1, col1, col1, colRed, colGreen, colBlue, t);
    }

    for (let vertices of upVertices) {
        t++;
        shadedPolygon(vertices, colRed, colGreen, colBlue, col2, col2, col2, t);
    }
    t++;

    return t;
}

function shadedPolygon(vertices, r1, g1, b1, r2, g2, b2, t) {
    theShader.setUniform("u_r1", r1);
    theShader.setUniform("u_g1", g1);
    theShader.setUniform("u_b1", b1);
    theShader.setUniform("u_r2", r2);
    theShader.setUniform("u_g2", g2);
    theShader.setUniform("u_b2", b2);
    theShader.setUniform("u_time", t);
    push();
    shader(theShader);
    beginShape();
    for (let v of vertices) {
        vertex(v[0], v[1]);
    }
    endShape(CLOSE);
    pop();
  }

const vert = `
    attribute vec3 aPosition;
    attribute vec2 aTexCoord;
    uniform mat4 uProjectionMatrix;
    uniform mat4 uModelViewMatrix;
    varying vec2 vTexCoord;

    void main() {
        vTexCoord = aTexCoord;
        vec4 position = vec4(aPosition, 1.0);
        gl_Position = uProjectionMatrix * uModelViewMatrix * position;
    }
`;

const frag = `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vTexCoord;

    uniform vec2 u_resolution;
    uniform float u_r1;
    uniform float u_g1;
    uniform float u_b1;
    uniform float u_r2;
    uniform float u_g2;
    uniform float u_b2;
    //uniform vec2 u_mouse;
    uniform float u_time;

    float random(in vec2 st) {
        return fract(sin(dot(st.xy + vec2(u_time),
                            vec2(12.9898,78.233)))
                    * 43758.5453123);
    }

    // 2D Noise based on Morgan McGuire @morgan3d
    // https://www.shadertoy.com/view/4dS3Wd
    float noise (in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        // Smooth Interpolation

        // Cubic Hermine Curve.  Same as SmoothStep()
        vec2 u = f*f*(3.0-2.0*f);
        // u = smoothstep(0.,1.,f);

        // Mix 4 coorners percentages
        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    float fbm(in vec2 x) {    
        float H = 1.;
        float G = exp2(-H);
        float f = 1.0;
        float a = 1.0;
        float t = 0.0;
        const int numOctaves = 5;
        /*
        for (int i = 0; i < numOctaves; i++) {
            t += a*noise(f*x);
            f *= 2.0;
            a *= G;
        }
        */
        // i = 0
        t += a*noise(f*x);
        f *= 2.0;
        a *= G;
        // i = 1
        t += a*noise(f*x);
        f *= 2.0;
        a *= G;
        // i = 2
        t += a*noise(f*x);
        f *= 2.0;
        a *= G;
        // i = 3
        t += a*noise(f*x);
        f *= 2.0;
        a *= G;
        // i = 4
        t += a*noise(f*x);
        f *= 2.0;
        a *= G;
                
        return t;
    }

    float pattern(in vec2 p) {
        vec2 q = vec2( fbm( p + vec2(0.0,0.0) ),
                        fbm( p + vec2(5.2,1.3) ) );

        vec2 r = vec2( fbm( p + 2.0*q + vec2(1.7,9.2) ),
                        fbm( p + 2.0*q + vec2(8.3,2.8) ) );

        return fbm( p + 2.*r );
    }

    void main() {
        vec2 st = gl_FragCoord.xy/u_resolution.xy;
        st.x *= u_resolution.x/u_resolution.y;

        st *= 2.5;
        float pat = pow(clamp(pattern(st), 0., 1.), 3.);
        float r = mix(u_r1, u_r2, pat);
        float g = mix(u_g1, u_g2, pat);
        float b = mix(u_b1, u_b2, pat);

        gl_FragColor = vec4(r, g, b, 1.0);
    }
`;