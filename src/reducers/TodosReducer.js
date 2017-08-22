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