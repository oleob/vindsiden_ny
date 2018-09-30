import {
  FETCHING_ALL_STATIONS,
  FETCHED_ALL_STATIONS,
  FETCHING_ALL_STATIONS_FAILED,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  UPDATE_SEARCH
} from '../actions/stationActions';

const favoriteIds = JSON.parse(localStorage.getItem('favorites'));

const initialState = {
  stations: [],
  favorites: [],
  searchResult: [],
  favoriteIds: favoriteIds === null ? [] : favoriteIds,
  fetching: false
};

const stationReducer = (state = initialState, action) => {
  let favoriteIds;
  let favorites;
  let stations;
  let searchResult;
  switch (action.type) {
    case FETCHING_ALL_STATIONS:
      return {
        ...state,
        stations: [],
        favorites: [],
        searchResult: [],
        fetching: true
      };
    case FETCHED_ALL_STATIONS:
      searchResult = action.payload.stations;
      stations = action.payload.stations.map(station => {
        station.isFavorite = state.favoriteIds.includes(station.StationID);
        return station;
      });
      favorites = action.payload.stations.filter(station => station.isFavorite);
      return {
        ...state,
        stations: action.payload.stations,
        favorites,
        searchResult,
        fetching: false
      };
    case FETCHING_ALL_STATIONS_FAILED:
      console.log(action.err);
      return {
        stations: [],
        favorites: [],
        searchResult: [],
        fetching: false
      };
    case ADD_FAVORITE:
      favoriteIds = state.favoriteIds;
      favoriteIds.push(action.payload.id);
      stations = state.stations.map(station => {
        station.isFavorite = favoriteIds.includes(station.StationID);
        return station;
      });
      favorites = state.stations.filter(station => station.isFavorite);
      localStorage.setItem('favorites', JSON.stringify(favoriteIds));
      return {
        ...state,
        stations,
        favoriteIds,
        favorites
      };
    case REMOVE_FAVORITE:
      favoriteIds = state.favoriteIds;
      favoriteIds = favoriteIds.filter(id => id !== action.payload.id);
      stations = state.stations.map(station => {
        station.isFavorite = favoriteIds.includes(station.StationID);
        return station;
      });
      favorites = state.stations.filter(station =>
        favoriteIds.includes(station.StationID)
      );
      localStorage.setItem('favorites', JSON.stringify(favoriteIds));
      return {
        ...state,
        stations,
        favoriteIds,
        favorites
      };
    case UPDATE_SEARCH:
      searchResult = state.stations.filter(
        station =>
          station.Name.toLowerCase().includes(action.payload.searchTerm) ||
          station.City.toLowerCase().includes(action.payload.searchTerm) ||
          station.Region.toLowerCase().includes(action.payload.searchTerm)
      );
      return {
        ...state,
        searchResult
      };
    default:
      return state;
  }
};

export default stationReducer;
