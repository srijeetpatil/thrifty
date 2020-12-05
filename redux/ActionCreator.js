import * as ActionTypes from './ActionTypes';
import {answer} from '../answer';

export const fetchAnswers = (dispatch) => {
    dispatch(addAnswers(answer));
};

export const addAnswer = (answers, answer) => (dispatch) => {        
    answers.push(answer);
    dispatch(addAnswers(answers));
}

export const deleteAnswer = (answers, answer) => (dispatch) => {
    var index = answers.indexOf(answer);
    answers.splice(index, 1);
    dispatch(addAnswers(answers));
}

export const likeAnswer = (answers, answer) => (dispatch) => {
    var index = answers.indexOf(answer);
    if(answers[index].disliked === 1){
        answers[index].disliked = 0;        
    }
    if(answers[index].liked === 1){
        answers[index].liked = 0;
    }
    else if(answers[index].liked === 0){
        answers[index].liked = 1;
    }
    dispatch(addAnswers(answers));
}

export const dislikeAnswer = (answers, answer) => (dispatch) => {
    var index = answers.indexOf(answer);
    if(answers[index].liked === 1){
        answers[index].liked = 0;        
    }
    if(answers[index].disliked === 1){
        answers[index].disliked = 0;
    }
    else if(answers[index].disliked === 0){
        answers[index].disliked = 1;
    }    
    dispatch(addAnswers(answers));
}

export const bookmarkAnswer = (answers, answer) => (dispatch) => {
    var index = answers.indexOf(answer);
    if(answers[index].bookmarked === 0){
        answers[index].bookmarked = 1;
    }
    else if(answers[index].bookmarked === 1){
        answers[index].bookmarked = 0;
    }
    dispatch(addAnswers(answers));
}

export const addAnswers = (answer) => ({
    type: ActionTypes.ADD_ANSWERS,
    payload: answer
});






