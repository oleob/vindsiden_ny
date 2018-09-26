import {
  FETCHING_STATION,
  FETCHED_STATION,
  FETCHING_STATION_FAILED
} from '../actions/singleStationActions';

const initialState = {
  name: '',
  region: '',
  city: '',
  copyright: '',
  meteogramUrl: '',
  text: '',
  fetching: false
};

const singleStationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_STATION:
      return {
        name: '',
        region: '',
        city: '',
        copyright: '',
        meteogramUrl: '',
        text: '',
        fetching: true
      };
    case FETCHED_STATION:
      let meteogramUrl = action.payload.station.MeteogramUrl;
      if (!meteogramUrl.endsWith('/')) {
        meteogramUrl += '/';
      }

      return {
        ...state,
        name: action.payload.station.Name,
        region: action.payload.station.Region,
        city: action.payload.station.City,
        copyright: action.payload.station.Copyright,
        meteogramUrl,
        text: action.payload.station.Text,
        fetching: false
      };
    case FETCHING_STATION_FAILED:
      return {
        name: '',
        region: '',
        city: '',
        copyright: '',
        meteogramUrl: '',
        text: '',
        fetching: false
      };
    default:
      return state;
  }
};

export default singleStationReducer;
