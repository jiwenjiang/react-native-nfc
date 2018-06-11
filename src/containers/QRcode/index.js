import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    TextInput
} from 'react-native';

class QRcode extends Component {
    state = {
        text: 'http://facebook.github.io/react-native/'
    };

    render() {
        return (
                <View style={styles.container}>
        <TextInput
                style={styles.input}
                onChangeText={(text) => this.setState({ text: text })}
                value={this.state.text}
        />
      </View >
        );
    };
}

const styles = StyleSheet.create(
        {
            container: {
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center'
            },

            input: {
                height: 40,
                borderColor: 'gray',
                borderWidth: 1,
                margin: 10,
                borderRadius: 5,
                padding: 5
            }
        }
);
export default QRcode;