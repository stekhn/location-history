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
            convertedData = [],
            mapFocus = {},
            fileContent = '';

        for (var i = 0; i < locations.length; i++) {

            let thisEntry = locations[i];

            // filter > 100
            if(thisEntry.accuracy > 100) {
                continue;
            }

            // Normalize the coordinates ...
            var latitude = thisEntry.latitudeE7 / divisor,
                longitude = thisEntry.longitudeE7 / divisor;

            let activityType = '';
            if(typeof thisEntry.activity == "object") {
                activityType = thisEntry.activity[0].activity[0].type;
            }

            convertedData.push([latitude, longitude, thisEntry.timestampMs, thisEntry.accuracy, activityType]);
        }

        // Make a string out of all data
        fileContent += 'var ' + locationsVariable + ' = ' + JSON.stringify(convertedData) + ';';

        saveFile(fileContent, convertedData.length);
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
    
}());