import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

class Home extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        // const { navigate } = this.props.navigation;
        return (
                <View style={styles.container}>
                <Text style={{ padding: 10 }}>Setting!</Text >
            </View >
        );
    }
}

const styles = StyleSheet.create(
        {
            container: {
                flex: 1,
                backgroundColor: '#fff'
            },
            icon: {
                height: 22,
                width: 22,
                resizeMode: 'contain'
            }
        }
);


export default Home;