import StoreContainer from '../StoreContainer';
import TodosActions from '../../actions/TodosActions';
import TodosStore from '../../stores/TodosStore';
import FilterLink from './FilterLink';

const mapStoreStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
      TodosActions.setVisibilityFilter(ownProps.filter);
  }
});

const FilterLinkContainer = StoreContainer({
    namedReducer: TodosStore
  },
    mapStoreStateToProps,
    mapDispatchToProps
)(FilterLink);

export default FilterLinkContainer
