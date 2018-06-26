import React, { PureComponent } from "react";
import { Header } from 'react-navigation';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';

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
                { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
        );
        this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
            this.setState({ lastPosition });
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    render() {
        return (
                <View style={styles.container}>
                <Text style={{ padding: 10 }}>Hello, J_bleach!</Text >
                <Text >
                <Text style={styles.title}>Initial position: </Text >
                    {JSON.stringify(this.state.initialPosition)}
                </Text >
                <Text >
                <Text style={styles.title}>Current position: </Text >
                    {JSON.stringify(this.state.lastPosition)}
                </Text >
            </View >
        );
    }
}

const styles = StyleSheet.create(
        {
            container: {
                flex: 1,
                backgroundColor: '#fff'
            }
        }
);


export default Home;