import pandas as pd
from bokeh.plotting import figure, output_file, show
from bokeh.layouts import column

output_file('index.html')
p = []
index = 0
granularities = ['day', 'month', 'year']
TOOLS = 'pan,box_zoom,wheel_zoom,box_select,hover,resize,reset,save'

for item in granularities:
    data = pd.read_csv('../data/' + item + '.csv', parse_dates=['Date'])

    p.append(figure(title='This chart is generated using Bokeh library',
                      width=900, height=500, x_axis_type="datetime", tools=TOOLS))

    p[index].line(data['Date'], data['Price'], line_width=2)

    p[index].circle(data['Date'], data['Price'], fill_color="white", size=6)

    p[index].xaxis[0].axis_label = 'Date'
    p[index].yaxis[0].axis_label = 'Price in USD'
    index += 1

show(column(p[0], p[1], p[2]))
