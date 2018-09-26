import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

import { fetchSingleStation } from '../actions/singleStationActions';

class Station extends Component {
  componentDidMount() {
    const { fetchSingleStation, id } = this.props;
    fetchSingleStation(id);
  }

  render() {
    const {
      name,
      region,
      city,
      copyright,
      text,
      meteogramUrl,
      showTemp1,
      showTemp2
    } = this.props;
    return (
      <Paper className="container">
        <h1>{name}</h1>
        <h1>{region}</h1>
        <h1>{city}</h1>
        {showTemp1 && <img src={meteogramUrl + 'avansert_meteogram.png'} />}
        {showTemp2 && <img src={meteogramUrl + 'marinogram.png'} />}
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  name: state.singleStationReducer.name,
  region: state.singleStationReducer.region,
  city: state.singleStationReducer.city,
  copyright: state.singleStationReducer.copyright,
  meteogramUrl: state.singleStationReducer.meteogramUrl,
  text: state.singleStationReducer.text,
  showWind: state.singleStationReducer.showWind,
  showTemp1: state.singleStationReducer.showTemp1,
  showTemp2: state.singleStationReducer.showTemp2
});

const mapDispatchToProps = {
  fetchSingleStation
};

Station.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  fetchSingleStation: PropTypes.func.isRequired,
  copyright: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  showWind: PropTypes.bool.isRequired,
  showTemp1: PropTypes.bool.isRequired,
  showTemp2: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Station);
