import pandas as pd
from bokeh.plotting import figure, output_file, show

granularities = ['day', 'month', 'year']

for item in granularities:
    data = pd.read_csv('../data/' + item + '.csv', parse_dates=['Date'])
    TOOLS = 'pan,box_zoom,wheel_zoom,box_select,hover,resize,reset,save'

    output_file('index_' + item + '.html')

    p = figure(title='This chart is generated using Bokeh library',
                   width=900, height=500, x_axis_type="datetime",
                   tools=TOOLS)

    p.line(data['Date'], data['Price'], line_width=2)

    p.circle(data['Date'], data['Price'], fill_color="white", size=6)

    p.xaxis[0].axis_label = 'Date'
    p.yaxis[0].axis_label = 'Price in USD'

    show(p)
