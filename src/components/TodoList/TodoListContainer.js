import { sliceContainer } from 'react-redux-boilerout';
import TodosActions from '../../actions/TodosActions';
import TodoList from './TodoList';


@sliceContainer({ slice: 'todos', actions: TodosActions, component: TodoList })
export default class VisibleTodoList {

    static getVisibleTodos = (todos, filter) => {
        switch (filter) {
            case 'SHOW_ALL':
                return todos;
            case 'SHOW_COMPLETED':
                return todos.filter(t => t.completed);
            case 'SHOW_ACTIVE':
                return todos.filter(t => !t.completed);
            default:
                throw new Error('Unknown filter: ' + filter)
        }
    };

    static mapSliceStateToProps(state) {
        return {
            todos: this.getVisibleTodos(state.items, state.filter)
        }
    }

    static inject() {

    }
}
