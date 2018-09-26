import { getRequest } from '../utilities/HttpRequest';

const FETCHING_STATION = 'FETCHING_STATION';
const FETCHED_STATION = 'FETCHED_STATION';
const FETCHING_STATION_FAILED = 'FETCHING_STATION_FAILED';

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

export { fetchSingleStation };
export { FETCHING_STATION, FETCHED_STATION, FETCHING_STATION_FAILED };
