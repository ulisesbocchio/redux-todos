import TodosStore from '../stores/TodosStore';
import { createStore, applyMiddleware, compose } from 'redux';
import { namedReducersEnhancer } from './namedReducers';
import logger from './logger';
import crashReporter from './crashReporter';
import TodosActions from '../actions/TodosActions';

const namedReducers = [
    TodosStore
];

const actionCreators = [
    TodosActions
];

const enhancer = compose(
    namedReducersEnhancer(),
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
    namedReducers,
    actionCreators
}, preloadedState, enhancer);