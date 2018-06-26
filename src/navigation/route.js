import { createStackNavigator } from 'react-navigation';
import MainScreenNavigator from './MainScreenNavigator';
import QRcode from '../containers/QRcode';
import Camera from '../containers/Camera';

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
                    title: '扫一扫'
                }
            },
            Camera: {
                screen: Camera,
                navigationOptions: {
                    header: null
                }
            }
        }
);
export default AppNavigator;