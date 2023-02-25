Line charts are bread and butter of visualization. Here we test out libraries and methods for making them.

Examples can be seen [here](http://datopian.github.io/line-charts/)

### Brief comments on each library:

* Vega - easy to get started, almost fully customizable.
* Vega-lite - very easy to generate basic charts, some limitations and difficulties when adding interactions such as hovering data points.
* Plotly and Plotly-json - simple usage, lots of features, very fast. One drawback is that JSON language is not very well documented, template oriented (not grammar of graphics) and not a standard like vega
* Chart.js - easy to get started but some limitations when working with CSV files. When added about 5k data entries it became significantly slow.
* Bokeh - very easy implementation, seems be more difficult to use on website than JS libraries.

### Shorlist:

* Vega/Vega-lite
  * Elegance: 4.5 (but takes a bit of work e.g. hovers have to be explicitly added)
  * Ease of implementation: 4
  * Performance: 5
  * Features: 3.5 (vega-embed supports download etc but is going away. zoom is quite complex etc)
  * Extensibility: 5 (very easy to change to other chart types, lots of support)
  * Community: 

* Plotly
  * Elegance: 4.5
  * Ease of implementation: 5
  * Performance: 5
  * Features: 5 (download, zoom etc are all built in)
  * Extensibility: 4 (lots of other chart types)

* Chart.js
  * Elegance: 4
  * Ease of implementation: 5
  * Performance: 3
  * Features: 3.5
  * Extensibility:
