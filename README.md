Location History visualized
================

Visualize your Google Location History with [Leaflet][1] and the [Leaflet heatmap plugin][2]. The node.js application will automatically convert your location data to a suitable format.

![Google Location History visualized](https://raw.githubusercontent.com/stekhn/location-history/master/preview.jpg)

### What it does
The Google location history file has a very peculiar format. To be used with Leaflet, it's necessary to convert the file to different format and calculate the starting point and zoom level for the map. The converted data is saved and can be viewed in a small web application using [Open Street Maps][4] as a base layer.

### How to use
1. Download and unzip this project. Alternatively: Clone this project using GIT.
2. Check if you have a [location history][5]. If you have no location history [learn about enabling the service][6] – If you don't mind Google getting a lot of private data from you.
3. Get your location history from [Google Takeout][7]
4. Copy your `LocationHistory.json` to the project folder. Note that the filename is localized, in Germany it's called `Standortverlauf.json`.
5. Install [node.js][8] on your machine.
6. Go to your favorite shell and run the command `node convert.js` or `node convert.js Standortverlauf.json` inside the project folder.
7. Open the `index.html` and enjoy.

### ToDos
* Add some kind of clustering alogorithm (k-Means?) to reduce the file size. Right now one year of location gatherings is about 9 MB. 
* Add tests for the automatic LatLongBox calculation

Have fun and use the code for your own projects.

License: [MIT][9]

# Changelog

## tgxn 24 Aug 2020

# README
- Removed invalid demo from README
- Cleaned up README grammar and included CLI usage.

# convert.js
- Added CLI input option for filename.
- Updated variable substitution to use ``.
- Added location accracy filter (`maxAccuracy`) to remove more vague location data.
- Fixed issue with `zoom` being set > `250` resulting in an invalid Leaflet view region.

# index / web
- Changed to English page `<title>`.
- Updated Leaflet version to `v0.7.7`.
- Include the [leaflet-heat][2] plugin locally.

[1]: http://leafletjs.com/
[2]: https://github.com/Leaflet/Leaflet.heat
[4]: http://www.openstreetmap.org/
[5]: https://maps.google.com/locationhistory/
[6]: https://support.google.com/accounts/answer/3118687?ref_topic=3100928&hl=en
[7]: https://www.google.com/takeout/?pli=1#custom:latitude
[8]: http://nodejs.org/
[9]: http://opensource.org/licenses/MIT
