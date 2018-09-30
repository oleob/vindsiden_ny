import { getRequest } from '../utilities/HttpRequest';

const FETCHING_STATION = 'FETCHING_STATION';
const FETCHED_STATION = 'FETCHED_STATION';
const FETCHING_STATION_FAILED = 'FETCHING_STATION_FAILED';

const FETCHING_WIND_DATA = 'FETCHING_WIND_DATA';
const FETCHED_WIND_DATA = 'FETCHED_WIND_DATA';
const FETCHING_WIND_DATA_FAILED = 'FETCHING_WIND_DATA_FAILED';

const UPDATE_FILTER = 'UPDAET_FILTER';

const fetchWindData = (id, date) => dispatch => {
  dispatch({ type: FETCHING_WIND_DATA });
  getRequest(
    `/api/measurements/${id}?date=${date.getFullYear()}-${date.getMonth() +
      1}-${date.getDate()}`
  ).then(res =>
    dispatch({ type: FETCHED_WIND_DATA, payload: { data: res.data } })
  );
};

const fetchSingleStation = id => dispatch => {
  dispatch({ type: FETCHING_STATION });

  getRequest('/api/stations/' + id)
    .then(res => {
      dispatch({ type: FETCHED_STATION, payload: { station: res.data } });
    })
    .catch(err => {
      dispatch({ type: FETCHING_STATION_FAILED });
    });
};

const updateFilter = value => dispatch => {
  dispatch({ type: UPDATE_FILTER, payload: { value } });
};

export { fetchSingleStation, fetchWindData, updateFilter };
export {
  FETCHING_STATION,
  FETCHED_STATION,
  FETCHING_STATION_FAILED,
  FETCHING_WIND_DATA,
  FETCHED_WIND_DATA,
  FETCHING_WIND_DATA_FAILED,
  UPDATE_FILTER
};
