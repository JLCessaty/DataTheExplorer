var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 4;
// Create the createMap function.
function createMap(highLayer, medLayer, lowLayer)
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
    //"Country Markers": countryLayer
    "High Population": highLayer,
    "Medium Population": medLayer,
    "Low Population": lowLayer,

  };
  // Create the map object with options.
  var map = L.map("map-id", {
    center: newYorkCoords,
    zoom: mapZoomLevel,
    layers: [streetmap, highLayer, medLayer, lowLayer]
  });
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  // make a variable for legend and position it in the bottom right of the screen
  var legend = L.control(
    {
        position: "bottomright"
    }
  );
  
  // add the properties for the legend
  legend.onAdd = function ()
  {
    // create a div for the legend
      var div = L.DomUtil.create("div", "info legend");
      console.log(div);

      var intervals = [0, .25, 1]; //this array represents the intervals for the population

      // this array represents the colors that will be associated with intervals
      // (populate these in reverse)
      var colors = [
          "green",
          "yellow",
          "red"
      ];

      // Use a loop to generate labels within the div
      // div starts as empty, then is populated with data from arrays
      for (var i = 0; i < intervals.length; i++) {
          //console.log(colors[i]);
          //console.log(intervals[i]);

          // use .innerHTML to set the value of the color and text for the interval
          div.innerHTML += "<i style='background: " + colors[i] + "'></i>"
              + intervals[i]
              + (intervals[i + 1] ? " &ndash; " + intervals[i + 1] + " billion<br>" : "+");
      }

      return div;
    };
    // add the legend to the map
    legend.addTo(map);

}
// Create the createMarkers function.
function createMarkers(data)
{
  console.log(data);

  // creates an array of countries that we can use to get the data that we need
  var countries = data;

  // Initialize an array to hold the bike markers.
  //var countryData = [];

  // Array for high population, over 1 billion 
  var highPopulation = [];

  // Array for medium populuation, between half to 1 billion
  var mediumPopulation = [];

  // Array for low population, less than half billion
  var lowPopulation = [];

  // Loop through the stations array.
  for(var i = 0; i < countries.length; i++)
  {
    // For each station, create a marker, and bind a popup with the station's name.
    // var country = L.marker([countries[i].latitude, countries[i].longitude])
    //   .bindPopup(`<h2>County: ${countries[i].location}</h2><hr><b>Id:</b> ${countries[i].iso3}</br><b>Population in year 2020:</b> ${countries[i].population}</br><b>GDP:</b> ${countries[i].gdp}`);
    
    // Change the marker size based on the population
    var markerRadius = countries[i].population / 1000;
    var markerColor;
 
    //countryData.push(country);
    var countryName = countries[i].location;
    
    console.log(_.isNaN(countryName));

    if(countries[i].population > 1000000000)
        markerColor = "red"
    else if(countries[i].population >= 250000000 )
        markerColor = "yellow"
    else 
        markerColor = "green"

      var country = L.circle([countries[i].latitude, countries[i].longitude], {
          fillOpacity: .30,
          color: 'grey',
          fillColor: markerColor,
          radius: markerRadius,
          weight: 2
      })
          .bindPopup(`<h2>County: ${countries[i].location}</h2><hr><b>Id:</b> ${countries[i].iso3}</br><b>Population in year 2020:</b> ${countries[i].population}</br><b>GDP:</b> ${countries[i].gdp}`);

      if (countries[i].population > 1000000000)
          highPopulation.push(country)
      else if (countries[i].population >= 500000000)
          mediumPopulation.push(country)
      else
          lowPopulation.push(country)

  }

  // Create a layer group that's made from the country  markers array, and pass it to the createMap function.
  //var countryLayer = L.layerGroup(countryData);
  var highLayer = L.layerGroup(highPopulation);
  var medLayer = L.layerGroup(mediumPopulation);
  var lowLayer = L.layerGroup(lowPopulation);

  //createMap(countryLayer);
  createMap(highLayer, medLayer,lowLayer);
}

// Perform an API call to get population data. Call createMarkers when it completes.
// d3.json("https://population.un.org/dataportalapi/api/v1/locations?page=1").then(
//   createMarkers
// );

d3.json("../Project 3/static/data/worldPopulationsData.json").then(
  createMarkers
);

