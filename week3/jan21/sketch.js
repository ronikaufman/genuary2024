/*
Genuary 2024
JAN.21 "Use a library that you haven’t used before."
By Roni Kaufman
https://ronikaufman.github.io
*/

function setup() {
    createCanvas(500, 500);
    pixelDensity(3);
    noLoop();
    //strokeCap(SQUARE);
}

function draw() {
    let colOfTheDay = rainbow(21/31);
    colOfTheDay = "#" + hex(~~red(colOfTheDay), 2) + hex(~~green(colOfTheDay), 2) + hex(~~blue(colOfTheDay), 2);
    let palette = [colOfTheDay, "#050505", "#fafafa"];

    let prevCol1;
    let n = 2;
    let h = height/14;
    for (let y = 1/2; y < height; y += h) {
        let col1;
        do {
            col1 = random(palette);
        } while (col1 == prevCol1)
        let w = (width+2*h)/n;
        prevCol1 = col1;
        
        for (let i = 0; i < n/2; i++) {
            let col2;
            do {
                col2 = random(palette);
            } while (col2 == col1)
            
            for (let x = i*w; x < (i+1)*w; x += 1/2) {
                let t = map(x, i*w, (i+1)*w, 0, 1);
                let col = spectral.mix(col1, col2, t);
                stroke(col);
                if (y < height/2-0.01) line(x, y, x-h, y+h);
                else line(x-h, y, x, y+h);
            }
            [col1, col2] = [col2, col1];
        }

        
        if (y < height/2-h-1) n*=2;
        else if (y > height/2-h+1) n/=2;
    }

    let halfImage = get(0, 0, width/2, height);
    scale(-1, 1);
    image(halfImage, -width, 0);
}
