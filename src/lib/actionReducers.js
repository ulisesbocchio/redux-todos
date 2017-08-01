import { combineReducers, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
}

function createSubtreeReducer({ reducer, methods }) {
    const methodCache = {};
    const findMethod = action => {
        if (!(action.type in methodCache)) {
            methodCache[action.type] = action.variants && methods.find(key => action.variants.includes(key));
        }
        return methodCache[action.type];
    };
    return (subtreeState, action) => {
        //eslint-disable-next-line no-undefined
        if (subtreeState === undefined) {
            return reducer.initialState();
        }
        const reducerMethod = findMethod(action);
        if (reducerMethod) {
            return reducer[reducerMethod].bind(reducer)(...action.payload, subtreeState);
        }
        return subtreeState;
    };
}

function actionVariants(type) {
    const normalized = normalizeActionName(type);
    return [normalized, `on${capitalize(normalized)}`];
}

function normalizeActionName(type) {
    if (type.match(/_/)) {
        return type.toLowerCase().split(/_/g).map((s, i) => i > 0 ? capitalize(s) : s).join('');
    }
    return type;
}

function objectMap(obj, mapFn) {
    return Object.assign({}, ...Object.entries(obj).map(([key, val]) => ({[key]: mapFn(val)})));
}

function combineAllReducers(actionReducers) {
    const reducersMap = Object.assign({}, ...actionReducers.map(actionReducer => ({[actionReducer.name]: actionReducer})));
    const storeReducers = objectMap(reducersMap, actionReducer => createSubtreeReducer(actionReducer));
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

function getClassMethods(instance) {
    return Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
        .filter(m => m !== 'constructor');
}

export function actionReducer(name) {
    return (reducerClass) => {
        const instance = new reducerClass();
        return {
            name,
            clazz: reducerClass,
            reducer: instance,
            methods: getClassMethods(instance),
            //eslint-disable-next-line no-unused-vars
            selector: (state, props) => state[name]
        }
    };
}

export function generateActionCreators(...actions) {
    return Object.assign({}, ...actions.map(action => ({[normalizeActionName(action)]: (...args) => ({
        type: action,
        payload: args,
        variants: actionVariants(action)
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

export function connectActionReducer({actionReducer, actions, inject}, mapStoreStateToProps, mapStoreDispatchToProps) {
    return (component) => {
        const mapStateToProps = (state, ownProps) => {
            return Object.assign({},
                actions,
                inject,
                mapStoreStateToProps ? mapStoreStateToProps(state, ownProps) : state
            );
        };

        const mapDispatchToProps = (dispatch, ownProps) => {
            return mapStoreDispatchToProps ? mapStoreDispatchToProps(dispatch, ownProps) : {};
        };

        const mapStateToPropsCreator = () => createSelector([actionReducer.selector, (s, p) => p], mapStateToProps);
        const mapDispatchToPropsCreator = () => createSelector([(d, p) => d, (d, p) => p], mapDispatchToProps);

        return connect(
            mapStateToPropsCreator,
            mapDispatchToPropsCreator
        )(component);
    };
}