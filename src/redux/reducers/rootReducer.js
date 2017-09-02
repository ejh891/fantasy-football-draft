import { combineReducers } from 'redux';

import app from './appReducer';
import playerList from './playerListReducer';
import playerDetails from './playerDetailsReducer';
import filterDrawer from './filterDrawerReducer';
import owner from './ownerReducer';

const rootReducer = combineReducers({
  app,
  playerList,
  playerDetails,
  filterDrawer,
  owner,
});

export default rootReducer;
