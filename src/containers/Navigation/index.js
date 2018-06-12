import { createStackNavigator } from 'react-navigation';
import MainScreenNavigator from './MainScreenNavigator';

const Navigation = createStackNavigator(
        {
            Home: {
                screen: MainScreenNavigator,
                navigationOptions: {
                    title: '首页'
                }
            }
        }
);

export default Navigation;