import { combineReducers } from 'redux';

import app from './appReducer';
import playerList from './playerListReducer';
import playerDetails from './playerDetailsReducer';
import filterDrawer from './filterDrawerReducer';
import owner from './ownerReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  app,
  playerList,
  playerDetails,
  filterDrawer,
  owner,
  auth,
});

export default rootReducer;
