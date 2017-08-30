import { combineReducers } from 'redux';

import playerList from './playerListReducer';

const rootReducer = combineReducers({
  playerList,
});

export default rootReducer;
