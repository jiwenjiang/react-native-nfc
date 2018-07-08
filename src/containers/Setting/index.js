import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Vibration,
    View,
    TextInput,
    DeviceEventEmitter
} from 'react-native';

import ScanView from 'react-native-scanidcard';

class ScanScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            torchMode: 'off',
            cameraType: 'back'
        };
    }

    componentDidMount() {
        this.listener = DeviceEventEmitter.addListener('scanCallBack', this.scanCallBack.bind(this)); //对应了原生端的名字
    }

    componentWillUnmount() {
        this.listener && this.listener.remove(); //记得remove哦
        this.listener = null;
    }

    scanCallBack(e) {
        console.info(e);
    }

    render() {
        return (

            <View></View>
        )
            ;
    }
}

export default ScanScreen;