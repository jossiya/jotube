import axios from "axios";
import {REGISTER_USER, LOGIN_USER, AUTH_USER, LOGOUT_USER, PROFILE_USER} from './types'

export function loginUser(dataToSubmit){
   
    const reqeust =axios.post('/api/login',dataToSubmit)
    .then(response=>response.data)
    
    return{
        type:LOGIN_USER,
        payload:reqeust
        
    }
    
};

export function registerUser(dataToSubmit){
     const reqeust =axios.post('/api/register',dataToSubmit)
        .then(response=>response.data)
    return{
        type : REGISTER_USER,
        payload : reqeust
    }
}   
export function profile(dataToSubmit){
    const reqeust =axios.post('/api/profile/imageUpdate',dataToSubmit)
       .then(response=>response.data)
   return{
       type : PROFILE_USER,
       payload : reqeust
   }
} 

export function auth(){
    
    const reqeust =axios.get('/api/auth')
    .then(response=>response.data)

    return{
        type : AUTH_USER,
        payload : reqeust
    }

    
}

export function logoutUser(){
    const request = axios.get(`/api/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}
