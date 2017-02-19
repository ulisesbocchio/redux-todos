import { namedStore } from '../lib/storesEnhancer';

class TodosStore {
    constructor() {
        this.lastId = 0;
    }

    initialState() {
        return {items: []};
    }

    addTodo(text, state) {
        state.items = [...state.items, {
            id: this.lastId++,
            text,
            completed: false
        }];
    }

    toggleTodo(id, state) {
        state.items = state.items
            .map(item => item.id === id ? Object.assign({}, item, {completed: !item.completed}) : item);
    }
}

export default namedStore('todos')(TodosStore);
