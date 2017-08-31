import { combineReducers } from 'redux';

import playerList from './playerListReducer';
import playerDetailsPop from './playerDetailsPopReducer';

const rootReducer = combineReducers({
  playerList,
  playerDetailsPop,
});

export default rootReducer;
