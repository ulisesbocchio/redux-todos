import { store } from '../lib/redux';
import { generateActionDispatchers } from 'react-redux-boilerout';

export default generateActionDispatchers(store.dispatch,
    'setVisibilityFilter',
    'addTodo',
    'TOGGLE_TODO'
);
