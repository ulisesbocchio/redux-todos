import { sliceContainer } from 'react-redux-boilerout';
import TodosActions from '../../actions/TodosActions';
import TodosReducer from '../../reducers/TodosReducer';
import FilterLink from './FilterLink';

@sliceContainer({ slice: TodosReducer, actions: TodosActions, component: FilterLink })
export default class FilterLinkContainer {
    static mapSliceStateToProps = (state, ownProps) => ({
        active: ownProps.filter === state.filter
    });

    static mapDispatchToProps = (dispatch, ownProps) => ({
        onClick: () => {
            TodosActions.setVisibilityFilter(ownProps.filter);
        }
    });
}
