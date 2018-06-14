import React, {
    Component
} from 'react';
import { connect } from 'react-redux';
import {
    createNavigationPropConstructor,       // handles #1 above
    initializeListeners,                   // handles #4 above
} from 'react-navigation-redux-helpers';
import AppNavigator from './route.js';


const navigationPropConstructor = createNavigationPropConstructor("root");

class Navigation extends Component {
    componentDidMount() {
        initializeListeners("root", this.props.nav);
    }

    render() {
        this._navigation = navigationPropConstructor(
                this.props.dispatch,
                this.props.nav,
                AppNavigator.router,
                () => this._navigation
        );
        return (
                <AppNavigator navigation={this._navigation} />
        );
    }
}
const mapStateToProps = (state) => ({
    nav: state.nav,
});


export default connect(mapStateToProps)(Navigation);