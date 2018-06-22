import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View
} from 'react-native';


class ScanScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const { maskStyle, children } = this.props;
        return (
                <View style={[styles.mask, maskStyle]}>
                    {children}
                </View >
        );
    }
}

const styles = StyleSheet.create(
        {
            mask: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                backgroundColor: '#000000',
                opacity: .45
            }
        }
);


export default ScanScreen;