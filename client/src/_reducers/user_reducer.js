import {
    LOGIN_USER, 
    REGISTER_USER, 
    AUTH_USER,
    LOGOUT_USER,
    PROFILE_USER
}from '../_actions/types';

export default function(state={},action){
    
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
        case REGISTER_USER: 
            return {...state, registerSucces: action.payload }
            case AUTH_USER: 
            return {...state, userData: action.payload}
        case LOGOUT_USER:
            return {...state }
        case PROFILE_USER:
            return {...state,profileSuccess: action.payload}
        default:
            return state;
    }
}
