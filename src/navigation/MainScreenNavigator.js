import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import tabBarIcon from '../components/tabBarIcon/index';
import Home from '../containers/Home/index';
import Setting from '../containers/Setting/index';
import Photo from '../containers/Photo/index';
import Upload from '../containers/Upload/index';

const MainScreenNavigator = createMaterialBottomTabNavigator(
        {
            Home: {
                screen: Home,
                navigationOptions: {
                    title: '首页',
                    tabBarIcon: tabBarIcon('home')
                }
            },
            Photo: {
                screen: Photo,
                navigationOptions: {
                    title: '拍照',
                    tabBarIcon: tabBarIcon('photo-album')
                }
            },
            NFC: {
                screen: Setting,
                navigationOptions: {
                    title: 'NFC',
                    tabBarIcon: tabBarIcon('credit-card')
                }
            },
            Upload: {
                screen: Upload,
                navigationOptions: {
                    title: '上传',
                    tabBarIcon: tabBarIcon('cloud-upload'),
                }
            },
            Setting: {
                screen: Setting,
                navigationOptions: {
                    title: '设置',
                    tabBarIcon: tabBarIcon('settings')
                }
            }
        },
        {
            shifting: true,
            backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
            initialRouteName: 'Home',
            activeTintColor: '#ffffff',
            inactiveTintColor: '#eeeeee',
            barStyle: {
                backgroundColor: '#4177F6',
                paddingBottom: 20,
                height: 50
            }
        }
);
export default MainScreenNavigator;