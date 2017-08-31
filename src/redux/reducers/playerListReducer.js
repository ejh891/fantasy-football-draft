import * as actionTypes from '../actions/actionTypes';

const defaultState = {
    allPlayers: [],
    discoveringPlayers: false,
    currentPageNumber: 1,
    numberOfPlayersPerPage: 20,
    playersOnThisPage: [],
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_DISCOVERING_PLAYERS:
            return {
                ...state,
                discoveringPlayers: action.discoveringPlayers
            }
        case actionTypes.SET_CURRENT_PAGE_NUMBER:
            return {
                ...state,
                currentPageNumber: action.currentPageNumber
            }
        case actionTypes.SET_NUMBER_OF_PLAYERS_PER_PAGE:
            return {
                ...state,
                numberOfPlayersPerPage: action.numberOfPlayersPerPage
            }
        case actionTypes.SET_PLAYERS_ON_THIS_PAGE:
            return {
                ...state,
                playersOnThisPage: action.playersOnThisPage
            }
        case actionTypes.ADD_CHUNK_OF_PLAYERS:
            return {
                ...state,
                allPlayers: [...state.allPlayers, ...action.players]
            }
        case actionTypes.SET_PLAYER_DETAILS:
            const modifiedAllPlayersClone = state.allPlayers.map((player) => {
                if (player.id === action.playerId) {
                    player.notes = action.playerDetails.notes;
                }

                return player;
            });

            return {
                ...state,
                allPlayers: modifiedAllPlayersClone
            }
        default:
            return state;
    }
}
