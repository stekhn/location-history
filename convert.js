/*
 * Converts and saves the Google Location history JSON to a format to
 * be used Leaflet Heat plugin 
 *
 * @author Steffen Kühne <stekhn@gmail.com>
 */

(function () {

   'use strict';

   var fs = require('fs'),
    inputFile = 'LocationHistory.json', // Set the default name for the input file
    outputFile = 'locations.js', // Set the default name for the output file
    locationsVariable = 'locations', // Name of variable that holds the locations
    mapVariable = 'map', // Name of variable that holds the map focus point and zoom level
    divisor = 10000000, // Divisor to convert the Google geo coordinates to the standard formt
    zoomFactor = 1.5; // Value by which the calculated zoom level is multiplyed

    // Read the file asynchronously and trigger callback
    fs.readFile(inputFile, handleFile);

    // Write the callback function
    function handleFile(err, data) {

        if (err) {
            // In case of "no such file or directory" ...
            if (err.code === 'ENOENT') {
                // ... notify the user about how the file must be named
                console.error('Location history file not found. The file must be named \"' + inputFile + '\"');
            } else {

                throw err;
            }
        } else {

            data = JSON.parse(data);
            convertData(data);
        }
    }

    function convertData(data) {

        var locations = data.locations,
            len = locations.length,
            convertedData = [],
            mapFocus = {},
            fileContent = '',
            latMin = Infinity,
            latMax = null,
            longMin = Infinity,
            longMax = null;
        
        for (var i = 0; i < len; i++) {

            // Normalize the coordinates ...
            var latitude = locations[i].latitudeE7 / divisor,
                longitude = locations[i].longitudeE7 / divisor,
                accuracy = locations[i].accuracy;

            // Get the extrema for latitude and longitude
            if (latitude < latMin) { latMin = latitude; }
            if (latitude > latMax) { latMax = latitude; }
            if (longitude < longMin) { longMin = longitude; }
            if (longitude > longMax) { longMax = longitude; }

            convertedData.push([latitude, longitude, accuracy]);
        }

        mapFocus = calculateMapFocus(latMin, latMax, longMin, longMax);

        // Make a string out of all data
        fileContent += 'var ' + locationsVariable + ' = ' + JSON.stringify(convertedData) + ';\n';
        fileContent += 'var ' + mapVariable + ' = ' + JSON.stringify(mapFocus) + ';';

        saveFile(fileContent, len);
    }

    function saveFile(data, quantity) {

        fs.writeFile(outputFile, data, function(err) {

            if (err) {

                console.log(err);
            } else {

                // Saving data was successfull
                console.log(quantity + ' locations saved to ' + outputFile);
            }
        });
    }

    function calculateMapFocus(latMin, latMax, longMin, longMax) {

        return {
            // The starting point for the map is calculated by the maximum/minimum latitude/longitude/
            lat : ((latMax - latMin) / 2) + latMin,
            long: ((longMax - longMin) / 2) + longMin,
            // The zoom level is calculated using the Pythagorean theorem
            zoom: Math.round(Math.sqrt(Math.pow(latMax - latMin, 2) + Math.pow(longMax - longMin, 2)) / zoomFactor)
        };
    }

}());