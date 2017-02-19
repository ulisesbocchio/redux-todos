import { connect } from 'react-redux';
import AppActions from '../../actions/AppActions';
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

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos.items, state.visibilityFilter.filter)
});

const mapDispatchToProps =  (dispatch) => ({
  onTodoClick: AppActions.toggleTodo
});

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);

export default VisibleTodoList
