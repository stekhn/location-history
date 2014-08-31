Location History visualized
================

Visualize your Google Location History with [Leaflet][1] and the [Leaflet heatmap plugin][2]. The node.js application will automatically convert your location data to a suitable format.

[Demo of my location history][3]

![Google Location History visualized](https://raw.githubusercontent.com/stekhn/location-history/master/preview.jpg)

### How to use
1. Download and unzip this project. Alternatively: Clone this project in Git.
2. Check if you have a [location history][4]. If you have no location history [learn about enabling the service][5] – If you don't mind Google getting a lot of private data from you.
3. Get your location history from [Google Takeout][6]
4. Copy your _LocationHistory.json_ to the project folder. Not that the filename is localized. Here in Germany it's named _Standortverlauf_. Rename your location history file to _LocationHistory.json_, if it's not alread named that way.
5. Install [node.js][7] on your machine.
6. Go to your favorite shell and run the command `node convert.js` inside the project folder.
7. Open the _index.html_ and enjoy.

### ToDos
* Add some kind of clustering alogorithm (k-Means?) to reduce the file size. Right now one year of location gatherings is about 9 MB. 
* Add support for node arguments, so you can call `node convert.js myfile.json`
* Add tests for the automatic LatLongBox calculation

Have fun and use the code for your own projects.

License: [MIT][8]

[1]: http://leafletjs.com/
[2]: https://github.com/Leaflet/Leaflet.heat
[3]: http://stekhn.de/locationhistory
[4]: https://maps.google.com/locationhistory/
[5]: https://support.google.com/accounts/answer/3118687?ref_topic=3100928&hl=en
[6]: https://www.google.com/takeout/?pli=1#custom:latitude
[7]: http://nodejs.org/
[8]: http://opensource.org/licenses/MIT