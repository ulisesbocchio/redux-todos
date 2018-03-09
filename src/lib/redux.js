import { createStore, applyMiddleware, compose } from 'redux';
import { DynamicSliceReducer } from 'react-redux-boilerout';
import logger from './logger';
import crashReporter from './crashReporter';

const reducerRegistry = new DynamicSliceReducer();
const enhancer = compose(
    applyMiddleware(
        logger,
        crashReporter
    ),
    reducerRegistry.enhancer
);

export const store = createStore(reducerRegistry.reducer, enhancer);
export const registerSliceReducer = reducerRegistry.registerSliceReducer;
export const actionDispatcher = reducerRegistry.actionDispatcher;
