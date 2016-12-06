var vlSpec = JSON.parse(Get('./config.json'));

var embedSpec = {
    mode: "vega-lite",
    spec: vlSpec
  };

change();

function change(){
  var series = document.getElementById('series').value;
  switch (series){
      case "day":
          vlSpec.data.url = "../data/day.csv";
          break;
      case "month":
          vlSpec.data.url = "../data/month.csv";
          break;
      case "year":
          vlSpec.data.url = "../data/year.csv";
          break;
  }

  vg.embed("#vis", embedSpec, function(error, result) {});
}

function Get(url){
      var Httpreq = new XMLHttpRequest(); // a new request
      Httpreq.open("GET",url,false);
      Httpreq.send(null);
      return Httpreq.responseText;
  }
