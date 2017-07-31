import StoreContainer from '../StoreContainer';
import TodosActions from '../../actions/TodosActions';
import TodoList from './TodoList';
import TodosStore from '../../stores/TodosStore';

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

const mapStoreStateToProps = (state) => ({
    todos: getVisibleTodos(state.items, state.filter)
});

const inject = {};

const VisibleTodoList = StoreContainer({
        namedReducer: TodosStore,
        actions: TodosActions,
        inject
    },
    mapStoreStateToProps
)(TodoList);

export default VisibleTodoList
