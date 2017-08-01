import { generateActionCreators } from '../lib/actionReducers';

export default generateActionCreators(
    'setVisibilityFilter',
    'addTodo',
    'TOGGLE_TODO'
);
