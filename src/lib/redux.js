import { createStore, applyMiddleware, compose } from 'redux';
import { DynamicSliceReducer, storeHolder } from 'react-redux-boilerout';
import logger from './logger';
import crashReporter from './crashReporter';

const enhancer = compose(
    applyMiddleware(
        logger,
        crashReporter
    ),
    storeHolder
);

const reducerRegistry = new DynamicSliceReducer();
const store = createStore(reducerRegistry.reducer(), enhancer);

export {
    store,
    reducerRegistry
}