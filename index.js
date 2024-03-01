// Define the number of clusters
const k = 3;

// Define the data points
const dataPoints = [
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 3],
    [3, 2],
    [6, 7],
    [7, 6],
    [8, 6],
    [7, 8],
    [8, 7]
];

// Initialize centroids randomly
let centroids = [];
for (let i = 0; i < k; i++) {
    centroids.push(dataPoints[Math.floor(Math.random() * dataPoints.length)]);
}

// Function to calculate Euclidean distance between two points
function euclideanDistance(point1, point2) {
    return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
}

// Function to assign each data point to the nearest centroid
function assignToClusters(dataPoints, centroids) {
    const clusters = new Array(k).fill().map(() => []);

    for (const point of dataPoints) {
        let minDistance = Infinity;
        let closestCentroid = null;

        for (let i = 0; i < centroids.length; i++) {
            const distance = euclideanDistance(point, centroids[i]);
            if (distance < minDistance) {
                minDistance = distance;
                closestCentroid = i;
            }
        }

        clusters[closestCentroid].push(point);
    }

    return clusters;
}

// Function to update centroids based on the mean of the points in each cluster
function updateCentroids(clusters) {
    const newCentroids = [];

    for (const cluster of clusters) {
        if (cluster.length === 0) {
            // If a cluster is empty, keep its centroid unchanged
            newCentroids.push(centroids[newCentroids.length]);
            continue;
        }

        const centroid = cluster.reduce((acc, val) => [acc[0] + val[0], acc[1] + val[1]], [0, 0]);
        newCentroids.push([centroid[0] / cluster.length, centroid[1] / cluster.length]);
    }

    return newCentroids;
}

// Run the K-Means algorithm
let iterations = 0;
let prevCentroids = null;
let clusters; // Define clusters outside the loop

do {
    prevCentroids = centroids;
    clusters = assignToClusters(dataPoints, centroids); // Assign clusters
    centroids = updateCentroids(clusters);
    iterations++;
} while (JSON.stringify(centroids) !== JSON.stringify(prevCentroids));

// Output the clusters and centroids
console.log(`Final clusters after ${iterations} iterations:`);
for (let i = 0; i < clusters.length; i++) {
    console.log(`Cluster ${i + 1}: ${clusters[i].length} points`);
    console.log(`Centroid: (${centroids[i][0]}, ${centroids[i][1]})`);
}
