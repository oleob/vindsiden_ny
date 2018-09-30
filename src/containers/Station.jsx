import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchSingleStation,
  fetchWindData
} from '../actions/singleStationActions';

import InfoBox from '../components/InfoBox';
import WindChart from '../components/WindChart';
import WindDirectionChart from '../components/WindDirectionChart';
import TemperatureChart from '../components/TemperatureChart';

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
      windData,
      windDirectionData,
      tempData
    } = this.props;

    return (
      <div className="container">
        <InfoBox {...{ name, region, city, copyright, text }} />
        <WindChart data={windData} />
        <WindDirectionChart data={windDirectionData} />
        <TemperatureChart data={tempData} />
        {meteogramUrl.length > 0 && (
          <img src={meteogramUrl + 'avansert_meteogram.png'} />
        )}
        {marinogramUrl.length > 0 && (
          <img src={marinogramUrl + 'marinogram.png'} />
        )}
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
  windData: state.singleStationReducer.windData,
  windDirectionData: state.singleStationReducer.windDirectionData,
  tempData: state.singleStationReducer.tempData
});

const mapDispatchToProps = {
  fetchSingleStation,
  fetchWindData
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
  windData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  windDirectionData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  tempData: PropTypes.shape({}).isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Station);
