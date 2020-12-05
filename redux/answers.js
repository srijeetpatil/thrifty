import * as ActionTypes from './ActionTypes';

export const Answers = (state = {answers: []}, action) => {
    switch(action.type){
        case ActionTypes.ADD_ANSWERS: 
            return {...state, answers: action.payload}         
        default:
            return state;
    }
}