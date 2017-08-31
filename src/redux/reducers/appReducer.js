import * as actionTypes from '../actions/actionTypes';
import appPages from '../../enums/appPages';

const defaultState = {
    appPageId: appPages.playerList,
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_APP_PAGE:
            return {
                ...state,
                appPageId: action.appPageId
            }
        default:
            return state;
    }
}
