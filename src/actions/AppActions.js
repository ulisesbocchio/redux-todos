import { generateActionDispatchers } from '../lib/redux';

export default generateActionDispatchers(
    'setVisibilityFilter',
    'addTodo',
    'toggleTodo'
);
