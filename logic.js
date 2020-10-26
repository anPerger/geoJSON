let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5
})

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
const queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(data => {
  features = data.features
  console.log(features)
  // Once we get a response, send the data.features object to the createFeatures function
  createLayers(features);
  
});

function createLayers(earthquakeData) {
    
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.title +
          "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
      }


    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
    });
    

    let mags = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: (feature, latlng) => {
          return new L.Circle(latlng, {
            radius: feature.properties.mag*20000,
          });
        }
    });

    

    
      
}

