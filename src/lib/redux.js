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

export const store = createStore({
    namedStores,
    actionCreators
}, enhancer);