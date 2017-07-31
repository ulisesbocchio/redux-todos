import {combineReducers, bindActionCreators} from 'redux';
import shallowEqual from './shallowEqual';

export function createStoreReducer(store) {
    return (previousStoreState, action) => {
        //eslint-disable-next-line no-undefined
        if (previousStoreState === undefined) return store.initialState();
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
    return Object.assign({}, ...Object.entries(obj).map(([key, val]) => ({[key]: mapFn(val)})));
}

function combineStoreReducers(stores) {
    const storeReducers = objectMap(stores, store => createStoreReducer(store));
    return combineReducers(storeReducers);
}

function bindActualActionCreators(actionCreators, boundActionCreators) {
    actionCreators.forEach((actionCreator, i) => {
        const boundActionCreator = boundActionCreators[i];
        Object.keys(actionCreator).forEach(key => {
            actionCreator[key] = boundActionCreator[key];
            actionCreator[key].defer = (...args) => setTimeout(() => actionCreator[key](...args));
        });
    });
}

export function namedReducer(name) {
    return (store) => ({
        name,
        store: new store(),
        //eslint-disable-next-line no-unused-vars
        selector: (s, p) => s[name]
    });
}

export function generateActionCreators(...actions) {
    return actions.reduce((acc, action) => {
        const actionCreatorMethod = (...args) => ({
            type: action,
            payload: args
        });
        return Object.assign(acc, {[action]: actionCreatorMethod});
    }, {});
}

export function namedReducersEnhancer() {
    return (createStore) => ({namedReducers, actionCreators}, preloadedState, enhancer) => {
        const storeMap = Object.assign({}, ...namedReducers.map(namedReducer => ({[namedReducer.name]: namedReducer.store})));
        const storeReducer = combineStoreReducers(storeMap);
        const store = createStore(storeReducer, preloadedState, enhancer);
        const boundActionCreators = actionCreators.map(ac => bindActionCreators(ac, store.dispatch));
        bindActualActionCreators(actionCreators, boundActionCreators);
        return store;
    };
}