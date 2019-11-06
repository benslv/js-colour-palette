let fs = require("fs");
let decode = require("image-decode");
let _ = require("underscore");

// Handle individual clusters of pixels.
class Cluster {
    constructor() {
        this.pixels = [];
        this.centroid = null;
        this.addPoint = function (pixel) {
            this.pixels.push(pixel);
        };
    }

    calculateCentroid() {
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

        // Initialise this.clusters as empty with length k.
        this.clusters = new Array(k);

        // Randomly select k pixels from the pixel data as our starting centroid coordinates.
        randomCentroids = _.sample(this.pixels, k);

        for (let i = 0; i < k; i++) {
            this.clusters[i] = new Cluster();
            this.clusters[i].centroid = randomCentroids[i];
        }

        let iterations = 0
        while (iterations < this.maxIterations) {

            // Iterate through each pixel and assign it to a cluster.
            // It is assigned to the cluster with the closest centroid.
            this.pixels.forEach(pixel => {
                this.assignCluster(pixel);
            });

            // Calculate the new centroid for each cluster.
            this.clusters.forEach(cluster => {
                this.calculateCentroid();
            });

            iterations++;
        }


    }
}

// Converts the pixel data returned by "decode-image" from Uint8Array to a 2D array: [[r,g,b], [r,g,b] ...]
function formatPixelData(pixels) {
    let output = [];
    let pixelData = Array.from(pixels.data);

    console.log(pixelData);

    for (let i = 0; i < pixelData.length; i = i + 4) {
        console.log(pixelData.slice(i, i + 3));
        output.push(pixelData.slice(i, i + 3));
    }

    return output;
}