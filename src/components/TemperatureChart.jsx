import React, { Component } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

class TemperatureChart extends Component {
  state = {
    data: {}
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const temperature = {};
      this.props.dataPoints.map(dataPoint => {
        const dateString = dataPoint.date.toUTCString();
        temperature[dateString] = dataPoint.temperature;
        return null;
      });

      this.setState({
        data: temperature
      });
    }
  }

  render() {
    return (
      <div>
        {Object.keys(this.state.data).length > 0 && (
          <LineChart
            ytitle="°C"
            suffix=" °C"
            data={this.state.data}
            messages={{ empty: 'No data' }}
          />
        )}
      </div>
    );
  }
}

export default TemperatureChart;
