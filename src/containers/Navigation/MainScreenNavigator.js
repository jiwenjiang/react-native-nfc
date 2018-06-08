import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Home from '../Home';
import Setting from '../Setting';

const MainScreenNavigator = createMaterialBottomTabNavigator(
        {
            Home: {
                screen: Home,
                navigationOptions: {
                    title: '首页'
                }
            },
            Setting: {
                screen: Setting,
                navigationOptions: {
                    title: '设置'
                }
            }
        },
        {
            backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
            initialRouteName: 'Home',
            activeTintColor: '#f0edf6',
            inactiveTintColor: '#3e2465',
            barStyle: {
                backgroundColor: '#694fad',
                paddingBottom: 20,
                height: 50
            }
        }
);
export default MainScreenNavigator;