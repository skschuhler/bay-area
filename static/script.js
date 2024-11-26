// Initialize the map
var map = L.map('map').setView([37.7749, -122.4194], 12); // San Francisco area

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Load and display the Stations layer (Points)
fetch('/static/data/stations.geojson')
  .then(response => response.json())
  .then(data => {
    console.log("Stops GeoJSON:", data); // Debugging routes data
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        // Use circle markers for better visibility
        return L.circleMarker(latlng, {
          radius: 6,        // Larger size
          fillColor: "red", // Fill color
          color: "black",   // Border color
          weight: 1,        // Border weight
          opacity: 0.8,
          fillOpacity: 0.8
        });
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.Name) {
          layer.bindPopup(`<b>${feature.properties.Name}</b><br>${feature.properties.Description}`);
        }
      }
    }).addTo(map);
  });


// Load and display the Routes layer (LineStrings)
fetch('/static/data/routes.geojson')
  .then(response => response.json())
  .then(data => {
    console.log("Routes GeoJSON:", data); // Debugging routes data
    L.geoJSON(data, {
      style: function (feature) {
        return {
          color: "blue",    // Route color
          weight: 2,        // Thicker lines
          opacity: 1      // Line opacity
        };
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.Name) {
          layer.bindPopup(`<b>${feature.properties.Name}</b><br>${feature.properties.Description}`);
        }
      }
    }).addTo(map);
  });


