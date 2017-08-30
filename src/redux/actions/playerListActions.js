import * as actionTypes from './actionTypes';
import axios from 'axios';

// bool to determine whether or not we are currently discovering players
export function setDiscoveringPlayers(discoveringPlayers) {
    return {
        type: actionTypes.SET_DISCOVERING_PLAYERS,
        discoveringPlayers
    }
}

export function setCurrentPageNumber(currentPageNumber) {
    return {
        type: actionTypes.SET_CURRENT_PAGE_NUMBER,
        currentPageNumber
    }
}

export function setNumberOfPlayersPerPage(numberOfPlayersPerPage) {
    return {
        type: actionTypes.SET_NUMBER_OF_PLAYERS_PER_PAGE,
        numberOfPlayersPerPage
    }
}

export function setPlayersOnThisPage(playersOnThisPage) {
    return {
        type: actionTypes.SET_PLAYERS_ON_THIS_PAGE,
        playersOnThisPage
    }
}

// adds a chunk of players to the all players list
export function addChunkOfPlayers(players) {
    return {
        type: actionTypes.ADD_CHUNK_OF_PLAYERS,
        players
    };
}

// async actions (via Thunk middleware)
export function discoverPlayers(offset) {
    if (!offset) { offset = 0; }
    
    return (dispatch, getState) => {
        const { playerList } = getState();

        if (!playerList.discoveringPlayers) {
            dispatch(setDiscoveringPlayers(true));
        }

        // ref: http://api.fantasy.nfl.com/v1/docs/service?serviceName=playersEditorDraftRanks
        const count = 100; // max allowed by api
        axios.get('http://api.fantasy.nfl.com/v1/players/editordraftranks/', {
            params: {
                format: 'json',
                offset, 
                count
            }
        })
            .then((res) => {
                if (res.data.players.length > 0) { // there might be more players, recursively discover more
                    dispatch(addChunkOfPlayers(res.data.players));
                    dispatch(discoverPlayers(offset + count, count))    
                } else {
                    dispatch(setDiscoveringPlayers(false));
                    dispatch(setPlayersOnThisPage(playerList.allPlayers.slice(0, playerList.numberOfPlayersPerPage)));
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
}
