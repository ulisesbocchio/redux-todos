import TodosReducer from '../reducers/TodosReducer';
import { createStore, applyMiddleware, compose } from 'redux';
import { actionReducersEnhancer } from './actionReducers';
import logger from './logger';
import crashReporter from './crashReporter';
import TodosActions from '../actions/TodosActions';

const actionReducers = [
    TodosReducer
];

const actionCreators = [
    TodosActions
];

const enhancer = compose(
    actionReducersEnhancer(),
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
    actionReducers,
    actionCreators
}, preloadedState, enhancer);