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
4. Copy your _LocationHistory.json_ to the project folder. Not that the filename is localized. Here in Germany it's named _Standortverlauf_. Rename your location history file to _LocationHistory.json_, if it's not already named that way.
5. Install [node.js][8] on your machine.
6. Go to your favorite shell and run the command `node convert.js` inside the project folder.
7. Open the _index.html_ and enjoy.

### ToDos
* Add some kind of clustering alogorithm (k-Means?) to reduce the file size. Right now one year of location gatherings is about 9 MB. 
* Add support for node arguments, so you can call `node convert.js myfile.json`
* Add tests for the automatic LatLongBox calculation

Have fun and use the code for your own projects.

License: [MIT][9]

[1]: http://leafletjs.com/
[2]: https://github.com/Leaflet/Leaflet.heat
[4]: http://www.openstreetmap.org/
[5]: https://maps.google.com/locationhistory/
[6]: https://support.google.com/accounts/answer/3118687?ref_topic=3100928&hl=en
[7]: https://www.google.com/takeout/?pli=1#custom:latitude
[8]: http://nodejs.org/
[9]: http://opensource.org/licenses/MIT