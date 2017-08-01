import {combineReducers, bindActionCreators} from 'redux';
import shallowEqual from './shallowEqual';

function createStoreReducer(actionReducerInstance) {
    return (previousStoreState, action) => {
        //eslint-disable-next-line no-undefined
        if (previousStoreState === undefined) {
            return actionReducerInstance.initialState();
        }
        let newState = previousStoreState;
        const actionReducer = actionReducerInstance[action.type];
        if (actionReducer) {
            newState = Object.assign({}, previousStoreState);
            actionReducer.bind(actionReducerInstance)(...action.payload, newState);
        }
        return (!actionReducer || shallowEqual(newState, previousStoreState)) ? previousStoreState : newState;
    };
}

function objectMap(obj, mapFn) {
    return Object.assign({}, ...Object.entries(obj).map(([key, val]) => ({[key]: mapFn(val)})));
}

function combineAllReducers(actionReducers) {
    const reducersMap = Object.assign({}, ...actionReducers.map(actionReducer => ({[actionReducer.name]: actionReducer.reducer})));
    const storeReducers = objectMap(reducersMap, store => createStoreReducer(store));
    return combineReducers(storeReducers);
}

function bindAllActionCreators(actionCreators, dispatch) {
    const boundActionCreators = actionCreators.map(ac => bindActionCreators(ac, dispatch));
    actionCreators.forEach((actionCreator, i) => {
        const boundActionCreator = boundActionCreators[i];
        Object.keys(actionCreator).forEach(key => {
            actionCreator[key] = boundActionCreator[key];
            actionCreator[key].defer = (...args) => setTimeout(() => actionCreator[key](...args));
        });
    });
}

export function actionReducer(name) {
    return (reducerClass) => ({
        name,
        reducer: new reducerClass(),
        //eslint-disable-next-line no-unused-vars
        selector: (state, props) => state[name]
    });
}

export function generateActionCreators(...actions) {
    return Object.assign({}, ...actions.map(action => ({[action]: (...args) => ({
        type: action,
        payload: args
    })})));
}

export function actionReducersEnhancer() {
    return (createStore) => ({actionReducers, actionCreators}, preloadedState, enhancer) => {
        const storeReducer = combineAllReducers(actionReducers);
        const store = createStore(storeReducer, preloadedState, enhancer);
        bindAllActionCreators(actionCreators, store.dispatch);
        return store;
    };
}