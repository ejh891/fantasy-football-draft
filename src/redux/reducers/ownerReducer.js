import * as actionTypes from '../actions/actionTypes';

const defaultState = {
    ownerData: {},
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.READ_OWNER_DATA:
            return {
                ...state,
                ownerData: action.ownerData
            }
        default:
            return state;
    }
}
