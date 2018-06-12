import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import tabBarIcon from '../../components/tabBarIcon';
import Home from '../Home';
import Setting from '../Setting';
import Photo from '../Photo';
import QRcode from '../QRcode';
import Upload from '../Upload';

const MainScreenNavigator = createMaterialBottomTabNavigator(
        {
            Home: {
                screen: Home,
                navigationOptions: {
                    title: '首页',
                    tabBarIcon: tabBarIcon('home'),
                }
            },
            photo: {
                screen: Photo,
                navigationOptions: {
                    title: '拍照',
                    tabBarIcon: tabBarIcon('photo-album'),
                }
            },
            QRcode:{
                screen: QRcode,
                navigationOptions: {
                    title: '二维码',
                    tabBarIcon: tabBarIcon('crop-free'),
                }
            },
            NFC: {
                screen: Setting,
                navigationOptions: {
                    title: 'NFC',
                    tabBarIcon: tabBarIcon('credit-card'),
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
                    tabBarIcon: tabBarIcon('settings'),
                }
            }
        },
        {
            shifting: true,
            backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
            initialRouteName: 'Upload',
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