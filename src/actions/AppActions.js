import { generateActionCreators } from '../lib/storesEnhancer';

export default generateActionCreators(
    'setVisibilityFilter',
    'addTodo',
    'toggleTodo'
);
