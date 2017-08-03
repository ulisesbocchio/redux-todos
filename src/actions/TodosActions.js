import { generateActionDispatchers } from 'react-redux-boilerout';

export default generateActionDispatchers(
    'setVisibilityFilter',
    'addTodo',
    'TOGGLE_TODO'
);
