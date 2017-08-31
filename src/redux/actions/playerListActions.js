import * as actionTypes from './actionTypes';
import axios from 'axios';

import Player from '../../entities/Player';
import * as playerDetailsActions from './playerDetailsActions';

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


// sets the player details for the given player
export function setPlayerDetails(playerId, playerDetails) {
    return {
        type: actionTypes.SET_PLAYER_DETAILS,
        playerId,
        playerDetails
    }
}

let positionCounter = {
    QB: 0,
    RB: 0,
    WR: 0,
    TE: 0,
    K: 0,
    DEF: 0,
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
                    const players = res.data.players.map((playerData) => {
                        positionCounter[playerData.position]++;
                        return new Player({
                            id: playerData.id, 
                            firstName: playerData.firstName, 
                            lastName: playerData.lastName,
                            position: playerData.position,
                            teamAbbr: playerData.teamAbbr,
                            overallRank: playerData.rank,
                            positionalRank: positionCounter[playerData.position]
                        });
                    });

                    dispatch(addChunkOfPlayers(players));
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

export function discoverPlayerDetails(playerId) {
    return (dispatch, getState) => {
        // http://api.fantasy.nfl.com/v1/docs/service?serviceName=playersDetails
        axios.get('http://api.fantasy.nfl.com/v1/players/details', {
            params: {
                playerId: playerId
            }
        })
            .then((res) => {
                console.log(res);
                dispatch(setPlayerDetails(playerId, res.data.players[0]));
                dispatch(playerDetailsActions.setPlayerDetailsLoading(false));
            });
    }
}
