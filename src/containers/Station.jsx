import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchSingleStation,
  fetchWindData,
  updateFilter
} from '../actions/singleStationActions';

import InfoBox from '../components/InfoBox';
import WindChart from '../components/WindChart';
import WindDirectionChart from '../components/WindDirectionChart';
import TemperatureChart from '../components/TemperatureChart';
import WindFilter from '../components/WindFilter';
import WeatherData from '../components/WeatherData';

class Station extends Component {
  componentDidMount() {
    const { fetchSingleStation, fetchWindData, id } = this.props;
    fetchSingleStation(id);
    fetchWindData(id, new Date());
  }

  render() {
    const {
      name,
      region,
      city,
      copyright,
      text,
      meteogramUrl,
      marinogramUrl,
      windDirectionData,
      tempData,
      updateFilter,
      filteredDataPoints,
      filterValue
    } = this.props;

    return (
      <div className="container">
        <InfoBox {...{ name, region, city, copyright, text }} />
        <WindFilter {...{ updateFilter, filterValue }} />
        <WindChart dataPoints={filteredDataPoints} />
        <WindDirectionChart dataPoints={filteredDataPoints} />
        <TemperatureChart dataPoints={filteredDataPoints} />
        <WeatherData {...{ meteogramUrl, marinogramUrl }} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  name: state.singleStationReducer.name,
  region: state.singleStationReducer.region,
  city: state.singleStationReducer.city,
  copyright: state.singleStationReducer.copyright,
  meteogramUrl: state.singleStationReducer.meteogramUrl,
  marinogramUrl: state.singleStationReducer.marinogramUrl,
  text: state.singleStationReducer.text,
  windDirectionData: state.singleStationReducer.windDirectionData,
  filteredDataPoints: state.singleStationReducer.filteredDataPoints,
  filterValue: state.singleStationReducer.filterValue
});

const mapDispatchToProps = {
  fetchSingleStation,
  fetchWindData,
  updateFilter
};

Station.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  fetchSingleStation: PropTypes.func.isRequired,
  fetchWindData: PropTypes.func.isRequired,
  copyright: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  meteogramUrl: PropTypes.string.isRequired,
  marinogramUrl: PropTypes.string.isRequired,
  windDirectionData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateFilter: PropTypes.func.isRequired,
  filteredDataPoints: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  filterValue: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Station);
