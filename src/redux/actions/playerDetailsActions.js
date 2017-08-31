import * as actionTypes from './actionTypes';

// bool to determine whether or not we are currently discovering player info
export function setPlayerDetailsLoading(playerDetailsLoading) {
    return {
        type: actionTypes.SET_PLAYER_DETAILS_LOADING,
        playerDetailsLoading
    }
}

export function setPlayerDetailsPlayer(playerDetailsPlayer) {
    return {
        type: actionTypes.SET_PLAYER_DETAILS_PLAYER,
        playerDetailsPlayer
    }
}
