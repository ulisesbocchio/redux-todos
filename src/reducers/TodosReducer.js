import { sliceReducer, registerSliceReducer } from 'react-redux-boilerout';
import { Map, Seq, List } from 'immutable';
import { reducerRegistry, store } from '../lib/redux';

class TodosReducer {
    constructor() {
        this.lastId = 4;
    }

    static initialState() {
        return {
            items: [{id: 1, text: 'buy beer', completed: true},
                {id: 2, text: 'watch TV', completed: false},
                {id: 3, text: 'go to sleep', completed: false}],
            filter: 'SHOW_ALL'
        };
    }

    addTodo(text, state) {
        const items = List(state.items).push({
            id: this.lastId++,
            text,
            completed: false
        });
        return Map(state)
            .merge({ items })
            .toJS();
    }

    onSetVisibilityFilter(filter, state) {
        return Map(state)
            .merge({ filter })
            .toObject();
    }

    toggleTodo(id, state) {
        const items = Seq(state.items)
            .map(item => item.id === id ? Map(item).set('completed', !item.completed) : item);
        return Map(state)
            .merge({ items })
            .toJS();
    }
}

export default registerSliceReducer(store, reducerRegistry)(sliceReducer('todos')(TodosReducer));
