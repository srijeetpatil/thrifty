import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Answers} from './answers';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            answers: Answers
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
}