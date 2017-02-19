import { combineReducers, bindActionCreators } from 'redux';
import shallowEqual from './shallowEqual';

const actionCreators = [];

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

function bindOwnActionCreators(boundActionCreators) {
    actionCreators.forEach((actionCreator, i) => {
        const boundActionCreator = boundActionCreators[i];
        Object.keys(actionCreator).forEach(key => {
            actionCreator[key] = boundActionCreator[key];
            actionCreator[key].defer = (...args) => setTimeout(() => actionCreator[key](...args));
        });
    });
}

export function namedStore(name) {
    return (store) => {
        return {[name]: new store()}
    };
}

export function generateActionCreators(...actions) {
    const actionCreator = actions.reduce((acc, action) => {
        const actionCreatorMethod = (...args) => ({
                type: action,
                payload: args
            });
        return Object.assign(acc, {[action]: actionCreatorMethod });
    },{});
    actionCreators.push(actionCreator);
    return actionCreator;
}

export function storesEnhancer() {
    return (createStore) => (namedStores, preloadedState, enhancer) => {
        const storeMap = Object.assign({}, ...namedStores);
        const storeReducer = combineStoreReducers(storeMap);
        const store = createStore(storeReducer, preloadedState, enhancer);
        const boundActionCreators = actionCreators.map(ac => bindActionCreators(ac, store.dispatch));
        bindOwnActionCreators(boundActionCreators);
        return store;
    }
}
