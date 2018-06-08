import { StackNavigator } from 'react-navigation';
import MainScreenNavigator from './MainScreenNavigator';
// import childScreen from 'childScreen';

const Navigation = StackNavigator({
    Home: {screen: MainScreenNavigator},
    // Chat: {screen: childScreen},
});

export default Navigation;