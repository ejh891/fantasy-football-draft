import { combineReducers } from 'redux';

import app from './appReducer';
import playerList from './playerListReducer';
import playerDetails from './playerDetailsReducer';
import filterDrawer from './filterDrawerReducer';

const rootReducer = combineReducers({
  app,
  playerList,
  playerDetails,
  filterDrawer,
});

export default rootReducer;
