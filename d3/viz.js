var w = 900;
var h = 400;
var padding = 20;
var format = [
              d3.time.format("%Y-%m-%d"),
              d3.time.format("%Y-%m"),
              d3.time.format("%Y")
             ];

var svg_holder = document.getElementById('holder');

function draw_graph(path, format_index) {
  var svg_element = document.getElementById('line_graph');
  if (svg_element) {
    svg_holder.removeChild(svg_element);
  }
  var myData = [];
  var domain_data = [];

  path = '../data/' + path + '.csv';

  d3.csv(path, function(error, data) {
    if (error) {
      console.log(error);
    } else {
      for (var i=0; i < data.length; i++) {
        var x = format[format_index].parse(data[i].Date);
        var y = parseFloat(data[i].Price);
        myData.push({'x':x, 'y':y});
      }
    }
    var minDate = myData[0]['x'];
    var maxDate = myData[myData.length-1]['x'];

    var xScale = d3.time.scale()
                  .domain([minDate, maxDate])
                  .range([padding+3, w-padding]);

    var yScale = d3.scale.linear()
                  .domain([0, d3.max(myData, function(d){return d.y})])
                  .range([h-padding, 10]);

    var xAxisGen = d3.svg.axis().scale(xScale).orient("bottom");
    var yAxisGen = d3.svg.axis().scale(yScale).orient("left");

    var lineFun = d3.svg.line()
      .x(function(d) { return xScale(d.x); })
      .y(function(d) { return yScale(d.y); })
      .interpolate('linear');

    var svg = d3.select('#holder')
      .append('svg')
      .attr({width: w, height: h})
      .attr('id', 'line_graph');

    var xAxis = svg.append("g").call(xAxisGen)
                  .attr("class", "axis")
                  .attr("transform", "translate(0," + (h-padding) + ")")

    var yAxis = svg.append("g").call(yAxisGen)
                  .attr("class", "axis")
                  .attr("transform", "translate(" + padding + ", 0)");

    var viz = svg.append('path')
      .attr({
        d: lineFun(myData),
        'stroke': 'purple',
        'stroke-width': 2,
        'fill': 'none'
      });

  });
}
