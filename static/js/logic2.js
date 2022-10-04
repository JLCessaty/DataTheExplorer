var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 4;
// Create the createMap function.
function createMap(countryLayer)
{
  // Create the tile layer that will be the background of our map.
  var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // grayscale layer
var grayscale = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
    });
    
    // water color layer
    var waterColor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 1,
    maxZoom: 16,
    ext: 'jpg'
    });


  // Create a baseMaps object to hold the streetmap layer.
  var baseMaps = {
    "Street Map": streetmap,
    "Grayscale Map": grayscale,
    "Water color Map": waterColor
  };
  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
   "Country Markers": countryLayer
    // "High Capacity Stations": highLayer,
    // "Medium Capacity Stations": medLayer,
    // "Low Capacity Stations": lowLayer,

  };
  // Create the map object with options.
  var map = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [streetmap, countryLayer]
  });
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}
// Create the createMarkers function.
function createMarkers(data)
{
  console.log(data);

  // creates an array of stations that we can use to get the data that we need
  var countries = data;
  // Initialize an array to hold the bike markers.
  // var bikeMarkers = [];

  // // Array for high capacity for stations > 40 bikes
  // var highCapacity = [];

  // // stations with bikes 25-40
  // var medCapacity = [];

  // // stations with bikes < 25
  // var lowCapacity = [];

  var countryData = [];

  // Loop through the stations array.
  for(var i = 0; i < countries.length; i++)
  {
    //console.log(countries[i].name)
    // For each station, create a marker, and bind a popup with the station's name.

    var country = L.marker([countries[i].latitude, countries[i].longitude])
      .bindPopup(`<h2>County: ${countries[i].location}</h2><hr><b>Id:</b> ${countries[i].iso3}</br><b>Population in year 2020:</b> ${countries[i].population}</br><b>GDP:</b> ${countries[i].gdp}`);
    
      // Add the marker to the bikeMarkers array.
      countryData.push(country);

    // if(stations[i].capacity > 40)
    //     highCapacity.push(bikeStation);
    // else if(stations[i].capacity >= 25)
    //     medCapacity.push(bikeStation);
    // else 
    //     lowCapacity.push(bikeStation);
 
  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  var countryLayer = L.layerGroup(countryData);
  // var highLayer = L.layerGroup(highCapacity);
  // var medLayer = L.layerGroup(medCapacity);
  // var lowLayer = L.layerGroup(lowCapacity);

  createMap(countryLayer);
  //createMap(highLayer, medLayer,lowLayer);
}

// Perform an API call to get population data. Call createMarkers when it completes.
// d3.json("https://population.un.org/dataportalapi/api/v1/locations?page=1").then(
//   createMarkers
// );

d3.json("../Project 3/static/data/worldPopulationsData.json").then(
  createMarkers
);

