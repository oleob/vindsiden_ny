import React from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const TemperatureChart = props => {
  return (
    <div>
      {Object.keys(props.data).length > 0 && (
        <LineChart
          ytitle="°C"
          suffix=" °C"
          data={props.data}
          messages={{ empty: 'No data' }}
        />
      )}
    </div>
  );
};

export default TemperatureChart;
