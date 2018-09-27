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
  marinogramUrl: '',
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
        name: '',
        region: '',
        city: '',
        copyright: '',
        meteogramUrl: '',
        marinogramUrl: '',
        text: '',
        fetching: false
      };
    default:
      return state;
  }
};

export default singleStationReducer;
