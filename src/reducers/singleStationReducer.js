import {
  FETCHING_STATION,
  FETCHED_STATION,
  FETCHING_STATION_FAILED,
  FETCHING_WIND_DATA,
  FETCHED_WIND_DATA,
  FETCHING_WIND_DATA_FAILED
} from '../actions/singleStationActions';

const initialState = {
  name: '',
  region: '',
  city: '',
  copyright: '',
  meteogramUrl: '',
  marinogramUrl: '',
  text: '',
  windData: [],
  fetching: false
};

const singleStationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_STATION:
      return {
        ...state,
        name: '',
        region: '',
        city: '',
        copyright: '',
        meteogramUrl: '',
        marinogramUrl: '',
        text: '',
        fetching: true
      };
    case FETCHED_STATION:
      let meteogramUrl = action.payload.station.MeteogramUrl;
      let marinogramUrl = action.payload.station.MarinogramUrl;
      if (!meteogramUrl.endsWith('/') && meteogramUrl.length > 0) {
        meteogramUrl += '/';
      }
      if (!marinogramUrl.endsWith('/') && marinogramUrl.length > 0) {
        marinogramUrl += '/';
      }

      return {
        ...state,
        name: action.payload.station.Name,
        region: action.payload.station.Region,
        city: action.payload.station.City,
        copyright: action.payload.station.Copyright,
        meteogramUrl,
        marinogramUrl,
        text: action.payload.station.Text,
        fetching: false
      };
    case FETCHING_STATION_FAILED:
      return {
        ...state,
        name: '',
        region: '',
        city: '',
        copyright: '',
        meteogramUrl: '',
        marinogramUrl: '',
        text: '',
        fetching: false
      };
    case FETCHING_WIND_DATA:
      return {
        ...state,
        windData: [],
        fetching: true
      };
    case FETCHED_WIND_DATA:
      let avgWindData = {};
      let maxWindData = {};
      let minWindData = {};
      action.payload.data.map(point => {
        avgWindData[point.Time] = point.WindAvg.toFixed(2);
        maxWindData[point.Time] = point.WindMax.toFixed(2);
        minWindData[point.Time] = point.WindMin.toFixed(2);
        return null;
      });
      return {
        ...state,
        windData: [
          { name: 'Gj. vind', data: avgWindData },
          { name: 'Maks vind', data: maxWindData },
          { name: 'Min vind', data: minWindData }
        ],
        fetching: false
      };
    case FETCHING_WIND_DATA_FAILED:
      return {
        ...state,
        windData: [],
        fetching: false
      };
    default:
      return state;
  }
};

export default singleStationReducer;
