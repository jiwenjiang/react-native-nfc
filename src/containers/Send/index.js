/**
 * Created by j_bleach on 2018/7/8.
 */
import React, {PureComponent} from "react";
import {Header} from 'react-navigation';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    Alert,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Mask from '../../components/Mask';

class Home extends PureComponent {

    static navigationOptions = {
        headerTitle: <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
            <Text style={{textAlign: 'center', flex: 7, fontSize: 18}}>电话送达，现场人证核实</Text>
            <Icon name="print" size={24} style={{alignSelf: 'flex-end', flex: 1}}/>
        </View>
    };

    constructor(props) {
        super(props);
        this.data = [
            {
                title: '身份证照',
                icon: 'payment'
            },
            {
                title: '人脸照',
                icon: 'room'
            },
            {
                title: '签字照',
                icon: 'pets'
            },
        ]
    }

    componentDidMount() {

    }

    navigate() {
        Alert.alert('无法送达', '确定？', [
            {text: '取消', onPress: () => console.log('OK Pressed')},
            {text: '确定', onPress: () => console.log('OK Pressed')},
        ])
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.Title}>
                    <Text style={styles.Text}>易证软件</Text>
                </View>
                <View style={styles.menus}>
                    <FlatList
                        data={this.data}
                        numColumns={3}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, separators}) => (
                            <TouchableOpacity style={styles.items}
                                              onPress={() => this.navigate(item)}>
                                <View style={{justifyContent: 'center'}}>
                                    <Icon name={item.icon} style={{textAlign: 'center', marginBottom: 8}}
                                          color="#4177F6" size={34}/>
                                    <Text>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.box}>
                        <TouchableOpacity style={[styles.btn, {marginLeft: 5}]}
                                          onPress={() => this.navigate()}>
                            <Text style={{color: '#4177F6'}}>无法送达</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.box}>
                        <TouchableOpacity style={[styles.btn, {marginRight: 5, backgroundColor: '#4177F6'}]}
                                          >
                            <Text style={{color: '#fff'}}>送达成功</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create(
    {
        container: {
            height: '100%',
            backgroundColor: '#fff'
        },
        Title: {
            height: '20%',
            backgroundColor: '#4177F6',
            alignItems: 'center',
            justifyContent: 'center',
        },
        Text: {
            fontSize: 28,
            color: '#fff',
        },
        items: {
            width: Dimensions.get('window').width / 3,
            height: Dimensions.get('window').width / 3,
            borderRightWidth: 0.5,
            borderBottomWidth: 0.5,
            borderColor: '#eeeeee',
            alignItems: 'center',
            justifyContent: 'center'
        },
        row: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        box: {
            flex: 1,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        btn: {
            borderColor: '#eee',
            borderWidth: 1,
            borderRadius: 5,
            width: '90%',
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
);


export default Home;