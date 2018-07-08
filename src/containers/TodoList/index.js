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
            <Text style={{textAlign: 'center', flex: 7, fontSize: 20}}>待领取列表</Text>
            <Icon name="search" size={26} onPress={() => {
                Alert.alert('Warning', '录屏没录上', [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ])
            }} style={{alignSelf: 'flex-end', flex: 1}}/>
        </View>
    };

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            data: [
                {
                    name: '刘欣1',
                    phone: '13982871231',
                    add: '(2018)川0106民初5920号1',
                    tab: [{title: '开庭:待定', color: '#FF1493'}, {title: '送达时限:2天内', color: '#FF1493'}]
                },
                {
                    name: '刘欣2',
                    phone: '13982871231',
                    add: '(2018)川0106民初5920号2',
                    tab: [{title: '开庭:待定', color: '#00FF7F'}, {title: '送达时限:2天内', color: '#00FF7F'}]
                },
                {
                    name: '刘欣3',
                    phone: '13982871231',
                    add: '(2018)川0106民初5920号3',
                    tab: [{title: '开庭:待定', color: '#00FF7F'}, {title: '送达时限:2天内', color: '#00FF7F'}]
                },
                {
                    name: '刘欣4',
                    phone: '13982871231',
                    add: '(2018)川0106民初5920号4',
                    tab: [{title: '开庭:待定', color: '#00FF7F'}, {title: '送达时限:2天内', color: '#00FF7F'}]
                },
                {
                    name: '刘欣5',
                    phone: '13982871231',
                    add: '(2018)川0106民初5920号5',
                    tab: [{title: '开庭:待定', color: '#FF1493'}, {title: '送达时限:2天内', color: '#FF1493'}]
                },
                {
                    name: '刘欣6',
                    phone: '13982871231',
                    add: '(2018)川0106民初5920号6',
                    tab: [{title: '开庭:待定', color: '#FF1493'}, {title: '送达时限:2天内', color: '#FF1493'}]
                },
                {
                    name: '刘欣7',
                    phone: '13982871231',
                    add: '(2018)川0106民初5920号7',
                    tab: [{title: '开庭:待定', color: '#FF1493'}, {title: '送达时限:2天内', color: '#FF1493'}]
                },
                {
                    name: '刘欣8',
                    phone: '13982871231',
                    add: '(2018)川0106民初5920号8',
                    tab: [{title: '开庭:待定', color: '#FF1493'}, {title: '送达时限:2天内', color: '#FF1493'}]
                },
            ],
            mask: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                mask: false
            })
        }, 1500)
    }

    navigate(i) {
        const {navigate} = this.props.navigation;
        navigate('Send')
    }

    ListFooterComponent = () => {
        const {isFetching} = this.state;
        return (
            isFetching ?
                <View style={styles.container}>
                    <ActivityIndicator
                        animating={true}
                        size="large"
                        color="#4177F6"
                    />
                </View > : null
        );
    };

    fetchData = async () => {
        await new Promise((res) => this.setState({isFetching: true}, () => {
            res();
        }));
        await new Promise((res) => setTimeout(() => {
            console.log('delay 1000ms');
            return res();
        }, 1000));
        this.setState({
            data: [...this.state.data, ...this.state.data]
        }, () => {
            this.setState({isFetching: false});
        })
    }


    render() {
        const {mask} = this.state;
        const maskProps = {
            maskStyle: styles.centering
        };
        return (
            <View style={styles.container}>
                {mask ? <Mask {...maskProps}>
                    <ActivityIndicator
                        size="large"
                        color="#4177F6"
                        style={[styles.centering]}
                    />
                </Mask > : <View style={styles.menus}>
                    <FlatList
                        data={this.state.data}
                        ListFooterComponent={this.ListFooterComponent}
                        onEndReachedThreshold={0.01}
                        onEndReached={this.fetchData}
                        refreshing={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, separators}) => (
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{
                                    flex: 5,
                                    marginLeft: 15,
                                    paddingBottom: 10,
                                    paddingTop: 10,
                                    borderBottomWidth: 0.5,
                                    borderBottomColor: '#eee',
                                }}>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{flex: 1}}>
                                            <Text style={{fontSize: 16}}>{item.name}</Text>
                                        </View>
                                        <View style={styles.row}>
                                            {item.tab.map((v, i) => {
                                                return (<View key={i}
                                                              style={[styles.bac, {backgroundColor: v.color}]}>
                                                    <Text style={{fontSize: 12, color: '#fff'}}>{v.title}</Text>
                                                </View>)
                                            })}
                                        </View>
                                    </View>
                                    <View><Text
                                        style={{fontSize: 14}}>{item.phone}</Text></View>
                                    <Text style={{fontSize: 14}}>{item.add}</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    borderBottomColor: '#eee',
                                    borderBottomWidth: 0.5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <TouchableOpacity
                                        onPress={() => this.navigate(item)}>
                                        <Icon name="chevron-right" size={24} color="#aaa"/>
                                    </TouchableOpacity>

                                </View>
                            </View>
                        )}
                    />
                </View>}

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
            flex: 1,
            backgroundColor: '#4177F6',
            alignItems: 'center',
            justifyContent: 'center',
        },
        Text: {
            fontSize: 28,
            color: '#fff',
        },
        menus: {
            flex: 4
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
        bac: {
            margin: 2,
            padding: 2,
            borderRadius: 4
        },
        centering: {
            alignItems: 'center',
            justifyContent: 'center'
        }
    }
);


export default Home;