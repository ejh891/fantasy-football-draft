import * as actionTypes from '../actions/actionTypes';

const defaultState = {
    user: null,
    userLoggingIn: false,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        case actionTypes.SET_USER_LOGGING_IN:
            return {
                ...state,
                userLoggingIn: action.userLoggingIn
            }
        default:
            return state;
    }
}
