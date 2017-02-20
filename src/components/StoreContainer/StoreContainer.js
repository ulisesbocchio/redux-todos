import { connect } from 'react-redux';

const StoreContainer = ({namedStore, actions, inject},mapStoreStateToProps, mapDispatchToProps) => (component) => {
    const mapStateToProps = (state, ownProps) => {
        return Object.assign({},
            actions,
            inject,
            mapStoreStateToProps ? mapStoreStateToProps(namedStore.selector(state), ownProps) : namedStore.selector(state)
        );
    };
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(component);
};

export default StoreContainer;
