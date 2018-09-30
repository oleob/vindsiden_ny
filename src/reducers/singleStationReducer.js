import {
  FETCHING_STATION,
  FETCHED_STATION,
  FETCHING_STATION_FAILED,
  FETCHING_WIND_DATA,
  FETCHED_WIND_DATA,
  FETCHING_WIND_DATA_FAILED,
  UPDATE_FILTER
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
  newData: [],
  fetching: false,
  filterValue: '5'
};

const filterData = data => {
  return data.map(dataPoint => {
    return {
      date: new Date(dataPoint.Time),
      avgWind: dataPoint.WindAvg.toFixed(2),
      maxWind: dataPoint.WindMax.toFixed(2),
      minWind: dataPoint.WindMin.toFixed(2),
      direction: dataPoint.DirectionAvg,
      temperature: dataPoint.Temperature1.toFixed(2)
    };
  });
};

const createWindData = data => {
  let avgWindData = {};
  let maxWindData = {};
  let minWindData = {};
  let windDirectionData = [];
  let tempData = {};
  data.map(point => {
    let date = point.Time;
    avgWindData[date] = point.WindAvg.toFixed(2);
    maxWindData[date] = point.WindMax.toFixed(2);
    minWindData[date] = point.WindMin.toFixed(2);
    tempData[date] = point.Temperature1.toFixed(2);
    windDirectionData.push({
      date: new Date(date),
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
      const newData = filterData(action.payload.data);
      return {
        ...state,
        ...data,
        newData,
        fetching: false
      };
    case FETCHING_WIND_DATA_FAILED:
      return {
        ...state,
        windData: [],
        fetching: false
      };
    case UPDATE_FILTER:
      return {
        ...state,
        filterValue: action.payload.value
      };
    default:
      return state;
  }
};

export default singleStationReducer;
