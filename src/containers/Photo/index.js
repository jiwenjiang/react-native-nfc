import React, { PureComponent } from "react";
import {
    StyleSheet,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CameraButton from '../../components/CameraButton';

class Home extends PureComponent {

    constructor(props) {
        super(props);
    }

    onFileUpload(file, fileName) {
        console.log(file);
    }

    render() {
        // const { navigate } = this.props.navigation;
        return (
                <View style={styles.container}>
                <CameraButton style={styles.cameraBtn}
                              photos={[]}
                              onFileUpload={this.onFileUpload}
                />
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