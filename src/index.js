import React, {
    Component
} from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Navigation from './containers/Navigation';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


class App extends Component {
    render() {
        return (
                <Provider store={store}>
                    <Navigation />
                </Provider >
        );
    }
}

export default App;