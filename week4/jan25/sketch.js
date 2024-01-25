/*
Genuary 2024
JAN.25 "If you like generative art, you probably have some photos on your phone of cool looking patterns, textures, shapes or things that you’ve seen. You might have even thought, “I should try to recreate this with code”. Today is the day."
By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
    createCanvas(500, 500, WEBGL);
    pixelDensity(3);
    noLoop();
}

function draw() {
    let strokeCol = 0, backCol = 20, colOfTheDay = rainbow(25/31);

    background(backCol);

    let n = 12;
    let s = width/n;

    let palette = [colOfTheDay, 100, 200];
    stroke(strokeCol);
    let i0 = random([0, 2]);
    shuffle(palette, true);
    for (let j = 0; j < n; j += 2) {
        let y = j*s-height/2;
        for (let i = i0; i < n; i += 4) {
            let x = i*s-width/2;

            fill(palette[0]);
            arc(x+s, y+s, 2*s, 2*s, PI, 3*PI/2);
            square(x-s, y+s, s);
            square(x+s, y, s);

            fill(palette[1]);
            arc(x+2*s, y+s, 2*s, 2*s, PI, 3*PI/2);
            arc(x+s, y+s, 2*s, 2*s, 0, PI/2);
            square(x+2*s, y, s);
            square(x, y+s, s);

            fill(backCol);
            arc(x+3*s, y+s, 2*s, 2*s, PI, 3*PI/2);
            arc(x-s, y+s, 2*s, 2*s, 0, PI/2);

            fill(palette[0]);
            arc(x, y+s, 2*s, 2*s, 0, PI/2);
        }
        i0 = 2-i0;
    }

    noFill();
    for (let x = -width/2; x < width/2; x += s) {
        for (let y = -height/2; y < 0; y += s) {
            square(x, y, s);
        }
    }

    let flooring = createGraphics(width, height);
    flooring.pixelDensity(4);
    flooring.background(backCol);
    flooring.stroke(strokeCol);
    i0 = random([0, 2]);
    shuffle(palette, true);
    for (let j = 0; j <= n; j += 2) {
        let y = j*s;
        for (let i = i0; i <= n; i += 4) {
            let x = i*s;

            flooring.fill(palette[0]);
            flooring.quad(x-s, y, x, y-s, x+s, y, x, y+s);
            flooring.fill(palette[1]);
            flooring.quad(x-s, y, x, y+s, x, y+2*s, x-s, y+s);
            flooring.fill(palette[2]);
            flooring.quad(x, y+s, x+s, y, x+s, y+s, x, y+2*s);
        }
        i0 = 2-i0;
    }

    flooring.noFill();
    for (let x = 0; x < width; x += s) {
        for (let y = 0; y < height; y += s) {
            flooring.square(x, y, s);
        }
    }

    flooring.fill(0, 20);
    flooring.square(0, 0, width);

    rotateX(PI/2.4);
    image(flooring, -width/2, 0);
}