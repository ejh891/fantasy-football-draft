import * as actionTypes from './actionTypes';

export function setCurrentAppPage(appPageId) {
    return {
        type: actionTypes.SET_CURRENT_APP_PAGE,
        appPageId
    }
}