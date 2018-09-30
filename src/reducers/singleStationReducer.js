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
  windData: [
    { name: 'Gj. vind', data: {} },
    { name: 'Maks vind', data: {} },
    { name: 'Min vind', data: {} }
  ],
  windDirectionData: [],
  tempData: {},
  fetching: false
};

const createWindData = data => {
  let avgWindData = {};
  let maxWindData = {};
  let minWindData = {};
  let windDirectionData = [];
  let tempData = {};
  data.map(point => {
    avgWindData[point.Time] = point.WindAvg.toFixed(2);
    maxWindData[point.Time] = point.WindMax.toFixed(2);
    minWindData[point.Time] = point.WindMin.toFixed(2);
    tempData[point.Time] = point.Temperature1.toFixed(2);
    windDirectionData.push({
      date: new Date(point.Time),
      direction: point.DirectionAvg
    });
    return null;
  });
  if (windDirectionData.length > 0) {
    const firstX = windDirectionData[0].date.valueOf();
    const lastX = windDirectionData[
      windDirectionData.length - 1
    ].date.valueOf();
    const xLength = lastX - firstX;
    windDirectionData = windDirectionData.map(point => {
      const x = 60 + (910 * (point.date.valueOf() - firstX)) / xLength;
      return {
        x,
        direction: point.direction
      };
    });
  }
  return {
    windData: [
      { name: 'Gj. vind', data: avgWindData },
      { name: 'Maks vind', data: maxWindData },
      { name: 'Min vind', data: minWindData }
    ],
    tempData,
    windDirectionData
  };
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
      const data = createWindData(action.payload.data);
      return {
        ...state,
        ...data,
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
