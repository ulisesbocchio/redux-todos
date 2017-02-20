import { connect } from 'react-redux';

const StoreContainer = ({namedStore, actions, inject}, extraMapStateToProps, mapDispatchToProps) => (component) => {
    const mapStateToProps = (state, ownProps) => {
        const props = Object.assign({},
            actions,
            inject,
            namedStore.selector(state)
        );
        Object.assign(props, extraMapStateToProps ? extraMapStateToProps(state, ownProps) : {})
    };
    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(component);
};

export default StoreContainer;
