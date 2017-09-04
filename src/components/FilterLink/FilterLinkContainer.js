import { sliceContainer } from 'react-redux-boilerout';
import TodosActions from '../../actions/TodosActions';
import FilterLink from './FilterLink';

@sliceContainer({ slice: 'todos', actions: TodosActions, component: FilterLink })
export default class FilterLinkContainer {
    static mapStoreStateToProps = (state, ownProps) => ({
        active: ownProps.filter === state.filter
    });

    static mapDispatchToProps = (dispatch, ownProps) => ({
        onClick: () => {
            TodosActions.setVisibilityFilter(ownProps.filter);
        }
    });
}
