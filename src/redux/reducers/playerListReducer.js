import * as actionTypes from '../actions/actionTypes';

const defaultState = {
    allPlayers: [],
    filteredPlayers: [],
    discoveringPlayers: false,
    currentPageNumber: 1,
    numberOfPlayersPerPage: 10,
    filters: ['QB', 'RB', 'WR', 'TE', 'K', 'DEF'],
    onlyShowAvailable: true,
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
        case actionTypes.ADD_CHUNK_OF_PLAYERS:
            return {
                ...state,
                allPlayers: [...state.allPlayers, ...action.players]
            }
        case actionTypes.SET_PLAYER_PROPS:
            const modifiedAllPlayersClone = state.allPlayers.map((player) => {
                if (player.id === action.playerId) {
                    return Object.assign(player, action.props);
                }

                return player;
            });

            return {
                ...state,
                allPlayers: modifiedAllPlayersClone
            }
        case actionTypes.ADD_FILTER:
            return {
                ...state,
                filters: [...state.filters, action.filter],
            }
        case actionTypes.REMOVE_FILTER:
            return {
                ...state,
                filters: state.filters.filter((filter) => { return filter !== action.filter; }),
            }
        case actionTypes.APPLY_FILTERS:
            let filteredPlayers = state.allPlayers.filter((player) => {
                return state.filters.includes(player.position);
            });

            if (state.onlyShowAvailable) {
                filteredPlayers = filteredPlayers.filter((player) => {
                    return !player.getOwner();
                });
            }
            return {
                ...state,
                filteredPlayers
            }
        case actionTypes.SET_ONLY_SHOW_AVAILABLE:
            return {
                ...state,
                onlyShowAvailable: action.onlyShowAvailable
            }
        default:
            return state;
    }
}
