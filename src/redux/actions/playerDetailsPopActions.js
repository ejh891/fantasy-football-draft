import * as actionTypes from './actionTypes';
import axios from 'axios';

// bool to determine whether or not we are currently discovering player info
export function setPlayerDetailsPopLoading(playerDetailsPopLoading) {
    return {
        type: actionTypes.SET_PLAYER_DETAILS_POP_LOADING,
        playerDetailsPopLoading
    }
}

export function setPlayerDetailsPopOpen(playerDetailsPopOpen) {
    return {
        type: actionTypes.SET_PLAYER_DETAILS_POP_OPEN,
        playerDetailsPopOpen
    }
}

export function setPlayerDetailsPopPlayer(playerDetailsPopPlayer) {
    return {
        type: actionTypes.SET_PLAYER_DETAILS_POP_PLAYER,
        playerDetailsPopPlayer
    }
}
