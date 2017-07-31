import { generateActionCreators } from '../lib/namedReducers';

export default generateActionCreators(
    'setVisibilityFilter',
    'addTodo',
    'toggleTodo'
);
