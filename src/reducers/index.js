import * as actionTypes from '../actions/types';
import {combinedReducers, combineReducers} from 'redux';



const initialUserState={
    currentUser:null,
    isLoading:true
};
const initialState=null;
const user_reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.SET_USER:
            return{
                currentUser:action.payload.currentUser,
                isLoading:false
            }
    
        default:
            return state;
    }
}

const rootReducer=combineReducers({
user:user_reducer
});
export default rootReducer;