import { actionDispatcher } from 'react-redux-boilerout';

@actionDispatcher({
    actions: ['setVisibilityFilter', 'addTodo', 'TOGGLE_TODO']
})
export default class TodosActions {}
