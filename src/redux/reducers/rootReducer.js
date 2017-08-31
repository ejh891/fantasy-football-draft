import { combineReducers } from 'redux';

import app from './appReducer';
import playerList from './playerListReducer';
import playerDetails from './playerDetailsReducer';

const rootReducer = combineReducers({
  app,
  playerList,
  playerDetails,
});

export default rootReducer;
