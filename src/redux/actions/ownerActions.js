import * as actionTypes from './actionTypes';
import { firebaseDatabase } from '../../config/firebase';

export function readOwnerData(ownerData) {
    return {
        type: actionTypes.READ_OWNER_DATA,
        ownerData
    }
}

export function registerNewOwner(user) {
    return (dispatch, getState) => {
        const { owner } = getState();
        const ownerData = owner.ownerData;
        let newOwnerData = JSON.parse(JSON.stringify(ownerData));

        if (!newOwnerData.owners) { newOwnerData.owners = []; }

        newOwnerData.owners.push({
            user: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
            },
            players: []
        });

        dispatch(writeOwnerData(newOwnerData));
    }
}

export function addPlayerToRoster(userUid, player) {
    return (dispatch, getState) => {
        const state = getState();
        const ownerData = state.owner.ownerData;
        let newOwnerData = JSON.parse(JSON.stringify(ownerData));

        const ownerToBeUpdated = newOwnerData.owners.filter((potentialOwner) => { 
            return potentialOwner.user.uid === userUid
        })[0];
        if (!ownerToBeUpdated.players) { ownerToBeUpdated.players = []; }
        ownerToBeUpdated.players.push(player.id);

        newOwnerData.owners = [
            ...newOwnerData.owners.filter((owner) => { return owner.user.uid !== ownerToBeUpdated.user.uid}),
            ownerToBeUpdated
        ];
        
        dispatch(writeOwnerData(newOwnerData));
    }
}

export function removePlayerFromRoster(userUid, player) {
    return (dispatch, getState) => {
        const state = getState();
        const ownerData = state.owner.ownerData;
        let newOwnerData = JSON.parse(JSON.stringify(ownerData));

        const ownerToBeUpdated = newOwnerData.owners.filter((owner) => { return owner.user.uid === userUid})[0];
        if (!ownerToBeUpdated.players) { ownerToBeUpdated.players = []; }
        ownerToBeUpdated.players = ownerToBeUpdated.players.filter((playerId) => { return playerId !== player.id});

        newOwnerData.owners = [
            ...newOwnerData.owners.filter((owner) => { return owner.user.uid !== ownerToBeUpdated.user.uid}),
            ownerToBeUpdated
        ];

        dispatch(writeOwnerData(newOwnerData));
    }
}

export function writeOwnerData(ownerData) {
    return (dispatch, getState) => {
        firebaseDatabase().ref('ownerData').set(ownerData);
    }
}
