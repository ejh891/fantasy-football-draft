import * as actionTypes from './actionTypes';

export function setUser(user) {
    return {
        type: actionTypes.SET_USER,
        user
    }
}

export function setUserLoggingIn(userLoggingIn) {
    return {
        type: actionTypes.SET_USER_LOGGING_IN,
        userLoggingIn
    }
}