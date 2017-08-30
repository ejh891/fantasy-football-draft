import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

let store;

// enable redux devtools
const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
)

export default (initialState) => {
    if (!store){
        store = createStore(rootReducer, initialState, enhancers);	
    }
    return store;
};
