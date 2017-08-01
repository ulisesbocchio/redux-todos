import { actionReducer } from '../lib/actionReducers';

class TodosReducer {
    constructor() {
        this.lastId = 0;
    }

    initialState() {
        return {items: [], filter: 'SHOW_ALL'};
    }

    addTodo(text, state) {
        state.items = [...state.items, {
            id: this.lastId++,
            text,
            completed: false
        }];
    }

    setVisibilityFilter(filter, state) {
        state.filter = filter;
    }

    toggleTodo(id, state) {
        state.items = state.items
            .map(item => item.id === id ? Object.assign({}, item, {completed: !item.completed}) : item);
    }
}

export default actionReducer('todos')(TodosReducer);
