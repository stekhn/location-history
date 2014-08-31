var fs = require('fs'),
    inputFile = 'LocationHistory.json',
    outputFile = 'locations.js',
    locationsVariable = 'locations',
    mapVariable = 'map',
    divisor = 10000000,
    zoomFactor = 1.5;


// Read the file and send to the callback
fs.readFile(inputFile, handleFile);


// Write the callback function
function handleFile(err, data) {

    if (err) {

        if (err.code === 'ENOENT') {

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

        var latitude = locations[i].latitudeE7 / divisor,
            longitude = locations[i].longitudeE7 / divisor,
            accuracy = locations[i].accuracy;

        if (latitude < latMin) { latMin = latitude; }
        if (latitude > latMax) { latMax = latitude; }
        if (longitude < longMin) { longMin = longitude; }
        if (longitude > longMax) { longMax = longitude; }

        convertedData.push([latitude, longitude, accuracy]);
    }

    mapFocus = calculateMapFocus(latMin, latMax, longMin, longMax);

    fileContent += 'var ' + locationsVariable + ' = ' + JSON.stringify(convertedData) + ';\n';
    fileContent += 'var ' + mapVariable + ' = ' + JSON.stringify(mapFocus) + ';';

    saveFile(fileContent, len);
}


function saveFile(data, quantity) {

    fs.writeFile(outputFile, data, function(err) {

        if (err) {

            console.log(err);
        } else {

            console.log(quantity + ' locations saved to ' + outputFile);
        }
    });
}


function calculateMapFocus(latMin, latMax, longMin, longMax) {

    return {
        lat : ((latMax - latMin) / 2) + latMin,
        long: ((longMax - longMin) / 2) + longMin,
        zoom: Math.round(Math.sqrt(Math.pow(latMax - latMin, 2) + Math.pow(longMax - longMin, 2)) / zoomFactor)
    };
}



