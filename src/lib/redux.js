import TodosStore from '../stores/TodosStore';
import { createStore, applyMiddleware, compose } from 'redux';
import { storesEnhancer } from './storesEnhancer';
import logger from './logger';
import crashReporter from './crashReporter';
import TodosActions from '../actions/TodosActions';

const namedStores = [
    TodosStore
];

const actionCreators = [
    TodosActions
];

const enhancer = compose(
    storesEnhancer(),
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
    namedStores,
    actionCreators
}, preloadedState, enhancer);