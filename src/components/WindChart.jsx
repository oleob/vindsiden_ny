import React from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const WindChart = props => {
  return (
    <LineChart
      legend="bottom"
      ytitle="m/s"
      suffix=" m/s"
      data={props.data}
      messages={{ empty: 'No data' }}
      colors={['#e57b7b', '#7be586', '#9ce9f4']}
    />
  );
};

export default WindChart;
