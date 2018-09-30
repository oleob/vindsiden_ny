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
  windDirectionData: [],
  tempData: {},
  dataPoints: [],
  filteredDataPoints: [],
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
  let windDirectionData = [];
  let tempData = {};
  data.map(point => {
    let date = point.Time;
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
    tempData,
    windDirectionData
  };
};

const singleStationReducer = (state = initialState, action) => {
  let filteredDataPoints;
  let filterDate;
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
      const dataPoints = filterData(action.payload.data);
      filterDate = new Date();
      filterDate.setHours(filterDate.getHours() - parseInt(state.filterValue));
      filteredDataPoints = dataPoints.filter(
        dataPoint => dataPoint.date.valueOf() >= filterDate.valueOf()
      );
      return {
        ...state,
        ...data,
        dataPoints,
        filteredDataPoints,
        fetching: false
      };
    case FETCHING_WIND_DATA_FAILED:
      return {
        ...state,
        windData: [],
        fetching: false
      };
    case UPDATE_FILTER:
      filterDate = new Date();
      filterDate.setHours(
        filterDate.getHours() - parseInt(action.payload.value)
      );
      filteredDataPoints = state.dataPoints.filter(
        dataPoint => dataPoint.date.valueOf() >= filterDate.valueOf()
      );
      return {
        ...state,
        filteredDataPoints,
        filterValue: action.payload.value
      };
    default:
      return state;
  }
};

export default singleStationReducer;
