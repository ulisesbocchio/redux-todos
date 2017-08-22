import { store } from '../lib/redux';
import { actionDispatcher } from 'react-redux-boilerout';

@actionDispatcher({
    dispatch: store.dispatch,
    actions: ['setVisibilityFilter', 'addTodo', 'TOGGLE_TODO']
})
export default class TodosActions {}
