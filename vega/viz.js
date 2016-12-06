change();
function change(){
    var series = document.getElementById('series').value;
    var url;
    var test;
    var template
    switch (series){
        case "daily":
            url = "../data/day.csv";
            test = "year(datum.Date) == year(mouseDate) && month(datum.Date) == month(mouseDate) && date(datum.Date) == date(mouseDate)";
            template = "Date: {{parent.y}}-{{parent.m}}-{{parent.d}}";
            break;
        case "monthly":
            url = "../data/month.csv";
            test = "year(datum.Date) == year(mouseDate) && month(datum.Date) == month(mouseDate)";
            template = "Date: {{parent.y}}-{{parent.m}}";
            break;
        case "annual":
            url = "../data/year.csv";
            test = "year(datum.Date) == year(mouseDate)";
            template = "Date: {{parent.y}}";
            break;
    }
    spec = {
      "width": 900,
      "height": 500,
      "padding": {"top": 20, "left": 65, "bottom": 50, "right": 100},
      "signals": [
        {
          "name": "mouseDate",
          "streams": [
            {
              "type": "mousemove",
              "expr": "eventX() > width - 155 ? eventX() - 155 : eventX()",
              "scale": {"name": "x","invert": true}
            }
          ]
        },
        {
          "name": "mousePrice",
          "streams": [
            {
              "type": "mousemove",
              "expr": "eventY()",
              "scale": {"name": "y","invert": true}
            }
          ]
        }
      ],
      "data": [
        {
          "name": "table",
          "url": url,
          "format": {"type": "csv", "parse": {"Price":"number", "Date" :"date"}}
        },
        {
          "name": "singleDate",
          "source": "table",
          "transform": [
            {
              "type": "filter",
              "test": test
            },
            {"type": "formula", "field": "y", "expr": "year(datum.Date)"},
            {"type": "formula", "field": "m", "expr": "parseInt(month(datum.Date)) + 1"},
            {"type": "formula", "field": "d", "expr": "date(datum.Date)"}
          ]
        }
      ],
      "scales": [
        {
          "name": "x",
          "type": "time",
          "range": "width",
          "domain": {"data": "table", "field": "Date"}
        },
        {
          "name": "y",
          "type": "linear",
          "range": "height",
          "domain": {"data": "table", "field": "Price"},
          "nice": true
        }
      ],
      "axes": [
        {"type": "x", "scale": "x", "grid": true, "title": "Date"},
        {"type": "y", "scale": "y", "title": "Price"}
      ],
      "marks": [
        {
          "type": "line",
          "from": {"data": "table"},
          "properties": {
            "enter": {
              "x": {"scale": "x", "field": "Date"},
              "y": {"scale": "y", "field": "Price"},
              "stroke": {"value": "steelblue"},
              "strokeWidth": {"value": 2}
            }
          }
        },
        {
          "type": "symbol",
          "from": {"data": "singleDate"},
          "properties": {
            "enter": {
              "x": {"scale": "x","field": "Date"},
              "y": {"scale": "y","field": "Price"},
              "stroke": {"value": "black"},
              "strokeWidth": {"value": 2}
            }
          }
        },
        {
          "type": "group",
          "from": {"data": "singleDate"},
          "properties": {
            "update": {
              "x": {"scale": "x", "signal": "mouseDate", "offset": 5},
              "y": {"scale": "y", "signal": "mousePrice", "offset": -40},
              "width": {"value": 150},
              "height": {"value": 35},
              "fill": {"value": "#edf1f7"},
              "fillOpacity": {"value": 0.85},
              "stroke": {"value": "#aaa"},
              "strokeWidth": {"value": 0.5}
            }
          },

          "marks": [
            {
              "type": "text",
              "properties": {
                "update": {
                  "x": {"value": 6},
                  "y": {"value": 14},
                  "text": {"template": template},
                  "fill": {"value": "black"},
                  "fontWeight": {"value": "bold"}
                }
              }
            },
            {
              "type": "text",
              "properties": {
                "update": {
                  "x": {"value": 6},
                  "y": {"value": 29},
                  "text": {"template": "Price: ${{parent.Price}}"},
                  "fill": {"value": "black"},
                  "align": {"value": "left"}
                }
              }
            }
          ]
        }
      ]
    };

    vg.embed('#vis', spec, function(error, result) {});
};
