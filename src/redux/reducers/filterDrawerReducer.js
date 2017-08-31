import * as actionTypes from '../actions/actionTypes';

const defaultState = {
    isOpen: false,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_FILTER_DRAWER_OPEN:
            return {
                ...state,
                isOpen: action.isOpen
            }
        default:
            return state;
    }
}
