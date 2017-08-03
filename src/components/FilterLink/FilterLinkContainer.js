import { connectSlice } from 'react-redux-boilerout';
import TodosActions from '../../actions/TodosActions';
import FilterLink from './FilterLink';

const mapStoreStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
      TodosActions.setVisibilityFilter(ownProps.filter);
  }
});

const FilterLinkContainer = connectSlice({
    slice: 'todos'
  },
    mapStoreStateToProps,
    mapDispatchToProps
)(FilterLink);

export default FilterLinkContainer
