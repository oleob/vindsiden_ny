import { getRequest } from '../utilities/HttpRequest';

const FETCHING_ALL_STATIONS = 'FETCHING_ALL_STATIONS';
const FETCHED_ALL_STATIONS = 'FETCHED_ALL_STATIONS';
const FETCHING_ALL_STATIONS_FAILED = 'FETCHING_ALL_STATIONS_FAILED';

const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

const UPDATE_SEARCH = 'UPDATE_SEARCH';

const addFavorite = id => dispatch => {
  dispatch({ type: ADD_FAVORITE, payload: { id } });
};

const removeFavorite = id => dispatch => {
  dispatch({ type: REMOVE_FAVORITE, payload: { id } });
};

const fetchAllStations = () => dispatch => {
  dispatch({ type: FETCHING_ALL_STATIONS });
  getRequest('/api/stations')
    .then(res => {
      dispatch({ type: FETCHED_ALL_STATIONS, payload: { stations: res.data } });
    })
    .catch(err => {
      dispatch({ type: FETCHING_ALL_STATIONS_FAILED, err });
    });
};

const updateSearch = searchTerm => dispatch => {
  dispatch({ type: UPDATE_SEARCH, payload: { searchTerm } });
};

export { fetchAllStations, addFavorite, removeFavorite, updateSearch };
export {
  FETCHING_ALL_STATIONS,
  FETCHED_ALL_STATIONS,
  FETCHING_ALL_STATIONS_FAILED,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  UPDATE_SEARCH
};
