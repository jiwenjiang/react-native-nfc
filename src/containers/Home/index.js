import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Home extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
                <View style={styles.container}>
                <Text style={{ padding: 10 }}>Hello, J_bleach!</Text >
                <Button
                        onPress={() => navigate('QRcode')}
                        title="扫描二维码"
                />
                    <Icon name="rocket" size={30} color="#900" />
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