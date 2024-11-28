// Initialize the map
var map = L.map('map').setView([37.7749, -122.4194], 12); // San Francisco area

// Add a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

fetch('/static/data/neighborhoods.geojson')
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      filter: function (feature) {
        // Only include neighborhoods with a 'rent' property
        return feature.properties && feature.properties.rent !== undefined;
      },
      style: function (feature) {
        return {
          color: "black", // Border color
          fillColor: "blue",
          weight: 1.5,     // Border thickness
          fillOpacity: 0.2 // Fill transparency
        };
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          // Bind popup with the neighborhood name
          layer.bindPopup(`<b>Neighborhood: </b>${feature.properties.name}</b><br>Average rent per person: </b>${feature.properties.rent}`);
        }

        // Optional: Add hover effects
        //layer.on("mouseover", function () {
        //  layer.setStyle({
        //    fillOpacity: 0.7,
        //    color: "orange" // Highlight color
        //  });
        //});
        //layer.on("mouseout", function () {
        //  layer.setStyle({
        //    fillOpacity: 0.5,
        //    color: "blue" // Reset color
        //  });
        //});

        // Log to console for debugging
        layer.on("click", function () {
          console.log(`Clicked on ${feature.properties.name}`);
        });
      }
    }).addTo(map);
  })
  .catch(error => console.error("Error loading GeoJSON:", error));


// Load and display the Routes layer (LineStrings)
fetch('/static/data/routes.geojson')
  .then(response => response.json())
  .then(data => {
    console.log("Routes GeoJSON:", data); // Debugging routes data
    L.geoJSON(data, {
      style: function (feature) {
        return {
          color: "black",    // Route color
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
          fillColor: "blue", // Fill color
          color: "black",   // Border color
          weight: 1,        // Border weight
          opacity: 0.8,
          fillOpacity: 0.8
        });
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.Name) {
          layer.bindPopup(`<b>${feature.properties.Name}</b><br>${feature.properties["Time to Downtown SF"]}</b><br>${feature.properties.Description}`);
        }
      }
    }).addTo(map).bringToFront(); // Bring the stops to the front;
  });

