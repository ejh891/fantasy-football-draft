import * as actionTypes from './actionTypes';
import { database } from '../../config/firebase';

export function readOwnerData(ownerData) {
    return {
        type: actionTypes.READ_OWNER_DATA,
        ownerData
    }
}

export function addPlayerToRoster(ownerId, player) {
    return (dispatch, getState) => {
        const { owner } = getState();
        const ownerData = owner.ownerData;
        let newOwnerData = JSON.parse(JSON.stringify(ownerData));

        const ownerToBeUpdated = newOwnerData.owners.filter((owner) => { return owner.id === ownerId})[0];
        if (!ownerToBeUpdated.players) { ownerToBeUpdated.players = []; }
        ownerToBeUpdated.players.push(player.id);

        newOwnerData.owners = [
            ...newOwnerData.owners.filter((owner) => { return owner.id !== ownerToBeUpdated.id}),
            ownerToBeUpdated
        ];
        
        dispatch(writeOwnerData(newOwnerData));
    }
}

export function removePlayerFromRoster(ownerId, player) {
    return (dispatch, getState) => {
        const { owner } = getState();
        const ownerData = owner.ownerData;
        let newOwnerData = JSON.parse(JSON.stringify(ownerData));

        const ownerToBeUpdated = newOwnerData.owners.filter((owner) => { return owner.id === ownerId})[0];
        if (!ownerToBeUpdated.players) { ownerToBeUpdated.players = []; }
        ownerToBeUpdated.players = ownerToBeUpdated.players.filter((playerId) => { return playerId !== player.id});

        newOwnerData.owners = [
            ...newOwnerData.owners.filter((owner) => { return owner.id !== ownerToBeUpdated.id}),
            ownerToBeUpdated
        ];

        dispatch(writeOwnerData(newOwnerData));
    }
}

export function writeOwnerData(ownerData) {
    return (dispatch, getState) => {
        database().ref('ownerData').set(ownerData);
    }
}
