import connectActionReducer from '../connectActionReducer';
import TodosActions from '../../actions/TodosActions';
import TodosReducer from '../../reducers/TodosReducer';
import FilterLink from './FilterLink';

const mapStoreStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
      TodosActions.setVisibilityFilter(ownProps.filter);
  }
});

const FilterLinkContainer = connectActionReducer({
    actionReducer: TodosReducer
  },
    mapStoreStateToProps,
    mapDispatchToProps
)(FilterLink);

export default FilterLinkContainer
