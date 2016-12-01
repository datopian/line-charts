draw_graph('day'); //to be shown on start

function draw_graph(path) {
  path = '../data/' + path + '.csv';
  Plotly.d3.csv(path, function(rows) {
      var trace = {
        type: 'scatter',
        mode: 'lines',
        x: rows.map(function(row){
          return row['Date'];
        }),
        y: rows.map(function(row){
          return row['Price'];
        }),
        line: {width: 1}
      };
      var layout = {
        yaxis: {title: 'Price in USD'},
        xaxis: {
          title: 'Date'
        },
        margin: {
          l: 60, b: 60, r: 20, t: 30
        }
      };

      Plotly.newPlot(document.getElementById('myDiv'), [trace], layout, {showlink: false});
    }
  );
}
