import { generateActionCreators } from '../lib/namedStoresEnhancer';

export default generateActionCreators(
    'setVisibilityFilter',
    'addTodo',
    'toggleTodo'
);
