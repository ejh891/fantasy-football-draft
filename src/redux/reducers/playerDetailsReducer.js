import * as actionTypes from '../actions/actionTypes';

const defaultState = {
    playerDetailsPopLoading: false,
    playerDetailsPopPlayer: null,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_PLAYER_DETAILS_LOADING:
            return {
                ...state,
                playerDetailsLoading: action.playerDetailsLoading
            }
        case actionTypes.SET_PLAYER_DETAILS_PLAYER:
            return {
                ...state,
                playerDetailsPlayer: action.playerDetailsPlayer
            }
        default:
            return state;
    }
}
