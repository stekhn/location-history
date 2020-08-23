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
        locationsVariable = 'locationData', // Name of variable that holds the locations
        mapVariable = 'mapViewData', // Name of variable that holds the map focus point and zoom level
        divisor = 10000000, // Divisor to convert the Google geo coordinates to the standard formt
        zoomFactor = 1.5; // Value by which the calculated zoom level is multiplyed

    // look for cli input
    if (process.argv[2] !== undefined) {
        inputFile = process.argv[2];
    }
    console.log("Reading InputFile:", inputFile);

    // Read the file asynchronously and trigger callback
    fs.readFile(inputFile, handleFile);

    // Write the callback function
    function handleFile(err, data) {

        if (err) {
            // In case of "no such file or directory" ...
            if (err.code === 'ENOENT') {
                // ... notify the user about how the file must be named
                console.error(`Location history file not found. The file must be named "${inputFile}"`);
            } else {

                throw err;
            }
        } else {

            data = JSON.parse(data);
            convertData(data.locations);
        }
    }

    function convertData(inputLocations) {

        var convertedData = [],
            mapFocus = {},
            fileContent = '',
            latMin = Infinity,
            latMax = null,
            longMin = Infinity,
            longMax = null;

        for (var i = 0; i < inputLocations.length; i++) {
            let thisLocation = inputLocations[i];

            // remove entryies with > 100 accuracy
            if (thisLocation.accuracy > 100) {
                continue;
            }

            // Normalize the coordinates ...
            var latitude = thisLocation.latitudeE7 / divisor,
                longitude = thisLocation.longitudeE7 / divisor;

            // Get the extrema for latitude and longitude
            if (latitude < latMin) { latMin = latitude; }
            if (latitude > latMax) { latMax = latitude; }
            if (longitude < longMin) { longMin = longitude; }
            if (longitude > longMax) { longMax = longitude; }

            convertedData.push([latitude, longitude]);
        }

        mapFocus = calculateMapFocus(latMin, latMax, longMin, longMax);

        // Make a string out of all data
        fileContent += 'var ' + locationsVariable + ' = ' + JSON.stringify(convertedData) + ';';
        fileContent += 'var ' + mapVariable + ' = ' + JSON.stringify(mapFocus) + ';';

        saveFile(fileContent, convertedData.length);
    }

    function saveFile(data, quantity) {

        fs.writeFile(outputFile, data, function (err) {

            if (err) {

                console.log(err);
            } else {

                // Saving data was successfull
                console.log(`${quantity} locations saved to ${outputFile}`);
            }
        });
    }

    function calculateMapFocus(latMin, latMax, longMin, longMax) {

        const mapFocus = {
            // The starting point for the map is calculated by the maximum/minimum latitude/longitude/
            lat: ((latMax - latMin) / 2) + latMin,
            long: ((longMax - longMin) / 2) + longMin,
            // The zoom level is calculated using the Pythagorean theorem
            zoom: Math.round(Math.sqrt(Math.pow(latMax - latMin, 2) + Math.pow(longMax - longMin, 2)) / zoomFactor)
        };

        // sometimes zoom is 250+ and needs to be knocked back
        if (mapFocus.zoom > 20) {
            mapFocus.zoom = 3;
        }

        return mapFocus;
    }

}());