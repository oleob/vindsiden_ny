import React from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

const data = { '2017-01-01': 11, '2017-01-02': 6 };

const WindChart = props => {
  return <LineChart data={data} />;
};

export default WindChart;
