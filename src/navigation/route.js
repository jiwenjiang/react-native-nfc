import { createStackNavigator } from 'react-navigation';
import MainScreenNavigator from './MainScreenNavigator';
import QRcode from '../containers/QRcode/index';

const AppNavigator = createStackNavigator(
        {
            Home: {
                screen: MainScreenNavigator,
                navigationOptions: {
                    title: '首页'
                }
            },
            QRcode: {
                screen: QRcode,
                navigationOptions: {
                    // header: null
                }
            }
        }
);
export default AppNavigator;