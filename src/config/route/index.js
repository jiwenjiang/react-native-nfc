import { createStackNavigator } from 'react-navigation';
import MainScreenNavigator from '../../containers/Navigation/MainScreenNavigator';

const AppNavigator = createStackNavigator(
        {
            Home: {
                screen: MainScreenNavigator,
                navigationOptions: {
                    title: '首页'
                }
            }
        }
);
export default AppNavigator;