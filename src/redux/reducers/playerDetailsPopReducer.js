import * as actionTypes from '../actions/actionTypes';

const defaultState = {
    playerDetailsPopLoading: false,
    playerDetailsPopOpen: false,
    playerDetailsPopPlayer: null,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_PLAYER_DETAILS_POP_LOADING:
            return {
                ...state,
                playerDetailsPopLoading: action.playerDetailsPopLoading
            }
        case actionTypes.SET_PLAYER_DETAILS_POP_OPEN:
            return {
                ...state,
                playerDetailsPopOpen: action.playerDetailsPopOpen
            }
        case actionTypes.SET_PLAYER_DETAILS_POP_PLAYER:
            return {
                ...state,
                playerDetailsPopPlayer: action.playerDetailsPopPlayer
            }
        default:
            return state;
    }
}
