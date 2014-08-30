var fs = require('fs'),
    inputFile = 'LocationHistory.json',
    outputFile = 'locations.js',
    variableName = 'locations',
    divisor = 10000000;

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

    var locations = data.locations;
    var convertedData = [];
    var len = locations.length;
    var str = '';

    for (var i = 0; i < len; i++) {

        var arr = [];

        arr.push(locations[i].latitudeE7 / divisor);
        arr.push(locations[i].longitudeE7 / divisor);
        arr.push(locations[i].accuracy);
        convertedData.push(arr);
    }

    str = str.concat('var ', variableName, ' = ', JSON.stringify(convertedData), ';');
    saveFile(str);

}

function saveFile(data) {
    fs.writeFile(outputFile, data, function(err) {

        if (err) {

            console.log(err);
        } else {

            console.log('Locations saved to ' + outputFile);
        }
    });
}



