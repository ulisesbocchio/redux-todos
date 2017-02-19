import { connect } from 'react-redux'
import AppActions from '../../actions/AppActions'
import FilterLink from './FilterLink'

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.visibilityFilter.filter
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
      AppActions.setVisibilityFilter(ownProps.filter);
  }
});

const FilterLinkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterLink);

export default FilterLinkContainer
