draw_graph('day'); //to be shown on start

function Get(url){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

var jsonConfig = JSON.parse(Get('./config.json'));

function draw_graph(path) {
  path = '../data/' + path + '.csv';

  Plotly.d3.csv(path, function(rows) {
    
      jsonConfig['data'][0]['x'] = rows.map(function(row){
                                  return row['Date'];
                                });

      jsonConfig['data'][0]['y'] = rows.map(function(row){
                                  return row['Price'];
                                });

      Plotly.newPlot('myDiv', jsonConfig['data'], jsonConfig['layout']);
    }
  );
}
