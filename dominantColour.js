let fs = require("fs");
let decode = require("image-decode");

// Handle individual clusters of pixels.
class Cluster {
    constructor() {
        this.pixels = [];
        this.centroid = null;
        this.addPoint = function (pixel) {
            this.pixels.push(pixel);
        };
    }

    calculateCentroid = function () {
        // Collect all R, G, B values into their own arrays.
        let R = this.pixels.map(pixel => {
            R.push(pixel[0]);
        });
        let G = this.pixels.map(pixel => {
            G.push(pixel[1]);
        });
        let B = this.pixels.map(pixel => {
            B.push(pixel[2]);
        });
        // Calculate average R, G, B values from the given pixel data.
        R = R.reduce((a, b) => a + b, 0) / R.length;
        G = G.reduce((a, b) => a + b, 0) / G.length;
        B = B.reduce((a, b) => a + b, 0) / B.length;
        this.centroid = [R, G, B];
        this.pixels = [];
        return this.centroid;
    };
}

class kMeans {
    constructor(k, maxIterations, minDistance, image) {
        this.k = k;
        this.maxIterations = maxIterations;
        this.minDistance = minDistance;
    }

    run(image) {
        this.image = image;

        // Gather pixel data from image...
        this.pixels = decode(fs.readFileSync(image));
        // ...then format it properly.
        this.pixels = formatPixelData(this.pixels);

        // Initialise this.clusters with k "null" elements.
        this.clusters = [];
        for (let i = 0; i < k; i++) {
            this.clusters.push(null);
        }
    }
}

// Converts the pixel data returned by "decode-image" from Uint8Array to a 2D array: [[r,g,b], [r,g,b] ...]
/* FIXME: This is not going to be correct because I also need a way of storing the coordinates of each pixel
          otherwise you can't calcualte the distance of each to its nearest centroid. */
function formatPixelData(pixels) {
    let output = [];
    let pixelData = Array.from(pixels.data);

    console.log(pixelData);

    for (let i = 0; i < pixelData.length; i = i + 4) {
        console.log(pixelData.slice(i,i+3));
        output.push(pixelData.slice(i,i+3));
    }

    return output;
}