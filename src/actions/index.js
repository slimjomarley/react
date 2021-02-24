import * as actionTypes from './types';
export const setuser=user=>{
    return{
        type:actionTypes.SET_USER,
        payload:{
            currentUser:user
        }
    }
}