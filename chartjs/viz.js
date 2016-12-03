var data;
var chart = document.getElementById('lineChart');

csv_parser('day'); // to load on start

// parse CSV into chart.js data format [{'x': value, 'y': value}, ...]
function csv_parser(path) {
  data = [];
  path = '../data/' + path + '.csv';
  data = Papa.parse(Get(path), {
    delimiter: "",	// auto-detect
  	newline: "",	// auto-detect
  	header: true,
  	dynamicTyping: true
  }).data;
  // need to rename keys from Date and Price to x and y
  for (i = 0; i < data.length; i++) {
    data[i]['x'] = data[i]['Date'];
    delete data[i]['Date'];
    data[i]['y'] = data[i]['Price'];
    delete data[i]['Price'];
  }

  drawChart(data);
};

// draw line chart with chart.js
function drawChart(data) {
  new Chart(chart, {
    type: 'line',
    data: {
          datasets: [{
              label: 'Price in USD',
              fill: false,
              backgroundColor: "rgba(70,140,241,0.4)",
              borderColor: "rgba(70,140,241,1)",
              borderCapStyle: 'butt',
              data: data
          }]
      },
      options: {
          scales: {
              xAxes: [{
                  type: 'time',
                  position: 'bottom'
              }]
          }
      }
    }
  );
}

// for gettin local file
function Get(url){
     var Httpreq = new XMLHttpRequest(); // a new request
     Httpreq.open("GET",url,false);
     Httpreq.send(null);
     return Httpreq.responseText;
}
