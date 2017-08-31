import * as actionTypes from './actionTypes';

export function setFilterDrawerOpen(isOpen) {
    return {
        type: actionTypes.SET_FILTER_DRAWER_OPEN,
        isOpen
    }
}