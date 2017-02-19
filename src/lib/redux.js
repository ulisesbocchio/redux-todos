import TodosStore from '../stores/TodosStore';
import VisibilityFilterStore from '../stores/VisibilityFilterStore';
import { createStore, applyMiddleware, compose } from 'redux';
import { storesEnhancer } from './storesEnhancer';
import logger from './logger';
import crashReporter from './crashReporter';

const namedStores = [
    TodosStore,
    VisibilityFilterStore
];

const enhancer = compose(
    storesEnhancer(),
    applyMiddleware(
        logger,
        crashReporter
    )
);

export const store = createStore(namedStores, enhancer);