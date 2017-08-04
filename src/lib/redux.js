import { createStore, applyMiddleware, compose } from 'redux';
import { combineSliceReducers } from 'react-redux-boilerout';
import logger from './logger';
import crashReporter from './crashReporter';
import TodosReducer from '../reducers/TodosReducer';

const enhancer = compose(
    applyMiddleware(
        logger,
        crashReporter
    )
);

const preloadedState = {
    todos: {
        items: [
            {id: -3, text: 'buy beer', completed: true},
            {id: -2, text: 'watch TV', completed: false},
            {id: -1, text: 'go to sleep', completed: false}
        ],
        filter: 'SHOW_ALL'
    },
};

const reducer = combineSliceReducers(TodosReducer);
const store = createStore(reducer, preloadedState, enhancer);

export {
    store
}