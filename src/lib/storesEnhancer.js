import { combineReducers } from 'redux';
import shallowEqual from './shallowEqual';

export function createStoreReducer(store) {
    return (previousStoreState, action) => {
        if(previousStoreState === undefined) return store.initialState();
        let newState = previousStoreState;
        const actionReducer = store[action.type];
        if (actionReducer) {
            newState = Object.assign({}, previousStoreState);
            actionReducer.bind(store)(...action.payload, newState);
        }
        return (!actionReducer || shallowEqual(newState, previousStoreState)) ? previousStoreState : newState;
    };
}

function objectMap(obj, mapFn) {
    return Object.assign({}, ...Object.entries(obj).map(([key, val]) => {
        return {[key]: mapFn(val)};
    }));
}

function combineStoreReducers(stores) {
    const storeReducers = objectMap(stores, store => createStoreReducer(store));
    return combineReducers(storeReducers);
}

export function namedStore(name) {
    return (store) => {
        return {[name]: new store()}
    };
}

export function storesEnhancer() {
    return (createStore) => (namedStores, preloadedState, enhancer) => {
        const storeMap = Object.assign({}, ...namedStores);
        const initialState = objectMap(storeMap, store => store.initialState());
        const storeReducer = combineStoreReducers(storeMap);
        return createStore(storeReducer, Object.assign({}, initialState, preloadedState), enhancer);
    }
}
