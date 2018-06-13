import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Button,
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

class RNCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        };
    }

    takePicture() {
        const options = {};
        this.camera.capture({ metadata: options })
                .then((data) => {
                    console.log(888);
                    // this.props.takePicture(data);
                })
                .catch(err => console.error(err));
    }

    cancel() {
        console.log('ll');
    }

    render() {
        const { visible } = this.state;
        return (
                <View style={styles.container}>
                    {visible ? <Camera ref={(cam) => {
                        this.camera = cam;
                    }}
                                       style={styles.preview}
                                       aspect={Camera.constants.Aspect.fill}
                                       captureTarget={Camera.constants.CaptureTarget.temp}
                    >
                    <TouchableOpacity style={styles.capture} onPress={() => this.cancel()}>
                        <Icon name="expand-more" size={30}/>
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.capture} onPress={() => this.takePicture()}>
                        <Icon name="camera-alt" size={30}/>
                    </TouchableOpacity >
                </Camera > : null}
                    <Image />
                </View >
        );
    }
}

const styles = StyleSheet.create(
        {
            container: {
                flex: 1,
                flexDirection: 'row'
            },
            preview: {
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'flex-end',
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
                zIndex: 1
            },
            capture: {
                flex: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 25,
                // color: '#000',
                margin: 10,
                marginBottom: 30,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
);

export default RNCamera;