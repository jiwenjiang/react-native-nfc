import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    View
} from 'react-native';
import QRScanner from '../../components/QRScanner';

class QRcode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '正在扫描'
        };
    }

    barcodeReceived(e) {
        console.log('Type: ' + e.type + '\nData: ' + e.data);
        //console.log(e)
        this.setState({ data: '扫描成功' });
    }

    render() {
        return (
                <QRScanner hintText={this.state.data}
                           onScanResultReceived={this.barcodeReceived.bind(this)}
                />
        );
    }
}

const styles = StyleSheet.create(
        {
            container: {
                flex: 1
            }
        }
);

export default QRcode;
