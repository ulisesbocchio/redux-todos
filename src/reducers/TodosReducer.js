import { sliceReducer } from 'react-redux-boilerout';
import { Map, Seq, List } from 'immutable';

@sliceReducer('todos')
export default class TodosReducer {
    constructor() {
        this.lastId = 0;
    }

    initialState() {
        return {
            items: [],
            filter: 'SHOW_ALL'
        };
    }

    addTodo(state, text) {
        const items = List(state.items).push({
            id: this.lastId++,
            text,
            completed: false
        });
        return Map(state)
            .merge({ items })
            .toJS();
    }

    onSetVisibilityFilter(state, filter) {
        return Map(state)
            .merge({ filter })
            .toObject();
    }

    toggleTodo(state, id) {
        const items = Seq(state.items)
            .map(item => item.id === id ? Map(item).set('completed', !item.completed) : item);
        return Map(state)
            .merge({ items })
            .toJS();
    }
}