import React, { Component } from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick';
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart);

class WindChart extends Component {
  constructor() {
    super();
    const filterDate = new Date();
    filterDate.setHours(filterDate.getHours() - 5);
    this.state = {
      data: [],
      filterDate
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const filterDate = new Date();
      filterDate.setHours(
        filterDate.getHours() - parseInt(this.props.filterValue)
      );
      const dataPoints = this.props.dataPoints.filter(
        dataPoint => dataPoint.date.valueOf() >= filterDate.valueOf()
      );
      console.log(dataPoints.length);

      const avgWind = {};
      const maxWind = {};
      const minWind = {};
      dataPoints.map(dataPoint => {
        const dateString = dataPoint.date.toUTCString();
        avgWind[dateString] = dataPoint.avgWind;
        maxWind[dateString] = dataPoint.maxWind;
        minWind[dateString] = dataPoint.minWind;
        return null;
      });

      this.setState({
        filterDate,
        data: [
          { name: 'Gj. vind', data: avgWind },
          { name: 'Maks vind', data: maxWind },
          { name: 'Min vind', data: minWind }
        ]
      });
    }
  }

  render() {
    console.log(this.state);
    const { data } = this.state;
    return (
      <LineChart
        legend="bottom"
        ytitle="m/s"
        suffix=" m/s"
        data={data}
        messages={{ empty: 'No data' }}
        colors={['#e57b7b', '#7be586', '#9ce9f4']}
      />
    );
  }
}

export default WindChart;
