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

export function generateActionDispatchers(...actions) {
    return actions.reduce((acc, action) => {
        const actionDispatcher = (...args) => {
            store.dispatch({
                type: action,
                payload: args
            });
        };
        actionDispatcher.defer = (...args) => setTimeout(() => actionDispatcher(...args));
        return Object.assign(acc, {[action]: actionDispatcher });
    },{});
}

