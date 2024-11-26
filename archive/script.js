// Initialize the map
const map = L.map('map').setView([37.7749, -122.4194], 10); // Set to a default Bay Area view

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const kmlLayer = new L.KML("doc.kml", {
    async: true
});

kmlLayer.on("loaded", function (e) {
    map.fitBounds(kmlLayer.getBounds());
});

map.addLayer(kmlLayer);

