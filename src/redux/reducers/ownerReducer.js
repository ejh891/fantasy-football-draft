import * as actionTypes from '../actions/actionTypes';

const defaultState = {
    ownerData: {},
    receivedInitialOwnerData: false,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.READ_OWNER_DATA:
            return {
                ...state,
                ownerData: action.ownerData
            }
        case actionTypes.SET_RECEIVED_INITIAL_OWNED_DATA:
            return {
                ...state,
                receivedInitialOwnerData: action.receivedInitialOwnerData
            }
        default:
            return state;
    }
}
