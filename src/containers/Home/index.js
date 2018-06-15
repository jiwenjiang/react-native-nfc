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
        this.state = {
            initialPosition: null,
            lastPosition: null
        };
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
                (initialPosition) => this.setState({ initialPosition }),
                (error) => alert(error.message),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
            this.setState({ lastPosition });
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
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
                <Text>
                <Text style={styles.title}>Initial position: </Text>
                        {JSON.stringify(this.state.initialPosition)}
                </Text>
                <Text>
                <Text style={styles.title}>Current position: </Text>
                {JSON.stringify(this.state.lastPosition)}
                </Text>
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