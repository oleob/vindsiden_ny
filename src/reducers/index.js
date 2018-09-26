import { combineReducers } from 'redux';

import stationReducer from './stationReducer';
import singleStationReducer from './singleStationReducer';

export default combineReducers({ stationReducer, singleStationReducer });
