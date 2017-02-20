import { combineReducers, bindActionCreators } from 'redux';
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

export function namedStore(name) {
    return (store) => ({
        name,
        store: new store(),
        selector: store => store[name]
    });
}

export function generateActionCreators(...actions) {
    return actions.reduce((acc, action) => {
        const actionCreatorMethod = (...args) => ({
                type: action,
                payload: args
            });
        return Object.assign(acc, {[action]: actionCreatorMethod });
    },{});
}

export function storesEnhancer() {
    return (createStore) => ({namedStores, actionCreators}, preloadedState, enhancer) => {
        const storeMap = Object.assign({}, ...namedStores.map(store => ({[store['name']]: store['store']})));
        const storeReducer = combineStoreReducers(storeMap);
        const store = createStore(storeReducer, preloadedState, enhancer);
        const boundActionCreators = actionCreators.map(ac => bindActionCreators(ac, store.dispatch));
        bindActualActionCreators(actionCreators, boundActionCreators);
        return store;
    }
}
