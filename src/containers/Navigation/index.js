import { StackNavigator } from 'react-navigation';
import MainScreenNavigator from './MainScreenNavigator';

const Navigation = StackNavigator(
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