import { LOGIN_USER, LOGOUT_USER } from './authConstants';
import { createReducer } from '../../app/common/util/reducerUtil';


const initialState = {
    currentUser: {}
}

export const loginUser = (state, payload) => {
    return {
        ...state,
        authenticated: true,
        currentUser: payload.creds.email
    }
}

export const logoutUser = (state, payload) => {
    return {
        ...state,
        authenticated: false,
        currentUser: {}
    }
}

export default createReducer(initialState, {
    [LOGIN_USER]: loginUser,
    [LOGOUT_USER]: logoutUser
});

