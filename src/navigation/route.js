import {createStackNavigator} from 'react-navigation';
import MainScreenNavigator from './MainScreenNavigator';
import QRcode from '../containers/QRcode';
import Camera from '../containers/Camera';
import TodoList from '../containers/TodoList';
import Send from '../containers/Send';

const RootNavigator = createStackNavigator(
    {
        Home: {
            screen: MainScreenNavigator,
            navigationOptions: {
                title: '易证6'
            },
        },
        QRcode: {
            screen: QRcode,
            navigationOptions: {
                //  header: null
            }
        },
        Camera: {
            screen: Camera,
            navigationOptions: {
                header: null
            }
        },
        TodoList: {
            screen: TodoList,
        },
        Send: {
            screen: Send,
        }
    }
);
export default RootNavigator;