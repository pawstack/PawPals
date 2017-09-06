var fs = require('fs');

var upperLat = 37.787;
var lowerLat = 37.769;
var upperLon = -122.406;
var lowerLon = -122.437;

// Source: https://data.sfgov.org/Geographic-Locations-and-Boundaries/Addresses-Enterprise-Addressing-System/sr5d-tnui
// download JSON, extract "data" array, paste as addresses below
var addresses = []; // TODO

var file = fs.createWriteStream(__dirname + '/sample_addresses.js', {flags: 'w'});
file.write('module.exports = [');

var parsedAddresses = addresses.forEach(address => {
  if (address[17]) {
    if (address[16] < upperLon && address[16] > lowerLon && address[17] < upperLat && address[17] > lowerLat) {
      file.write(`'${address[10]}, San Francisco, CA ${address[15]}'` + ',\n');
    }
  }
});
file.write('];');
file.end();