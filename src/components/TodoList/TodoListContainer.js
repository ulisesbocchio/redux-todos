import { connectSlice } from 'react-redux-boilerout';
import TodosActions from '../../actions/TodosActions';
import TodoList from './TodoList';

const getVisibleTodos = (todos, filter) => {
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

const mapSliceStateToProps = (state) => ({
    todos: getVisibleTodos(state.items, state.filter)
});

const inject = {};

const VisibleTodoList = connectSlice({
        slice: 'todos',
        actions: TodosActions,
        inject
    },
    mapSliceStateToProps
)(TodoList);

export default VisibleTodoList
