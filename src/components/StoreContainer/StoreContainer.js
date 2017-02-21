import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const StoreContainer = ({namedStore, actions, inject}, mapStoreStateToProps, mapStoreDispatchToProps) => (component) => {
    const mapStateToProps = (state, ownProps) => {
        return Object.assign({},
            actions,
            inject,
            mapStoreStateToProps ? mapStoreStateToProps(state, ownProps) : state
        );
    };

    const mapDispatchToProps = (dispatch, ownProps) => {
        return mapStoreDispatchToProps ? mapStoreDispatchToProps(dispatch, ownProps) : {};
    };

    const mapStateToPropsCreator = () => createSelector([namedStore.selector, (s, p) => p], mapStateToProps);
    const mapDispatchToPropsCreator = () => createSelector([(d, p) => d, (d, p) => p], mapDispatchToProps);

    return connect(
        mapStateToPropsCreator,
        mapDispatchToPropsCreator
    )(component);
};

export default StoreContainer;
