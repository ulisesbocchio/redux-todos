import TodosReducer from '../reducers/TodosReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import { boileroutEnhancer } from 'react-redux-boilerout';
import logger from './logger';
import crashReporter from './crashReporter';
import TodosActions from '../actions/TodosActions';

const sliceReducers = [
    TodosReducer
];

const actionDispatchers = [
    TodosActions
];

const enhancer = compose(
    boileroutEnhancer(),
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

export const store = createStore({
    sliceReducers,
    actionDispatchers
}, preloadedState, enhancer);