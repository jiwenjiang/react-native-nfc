import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    Button,
    Text,
    ImageBackground,
    View,
    TouchableOpacity
} from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { deleteFile, mkdir, readPath } from '../../service/utils/fileOperations';
import RNFS from 'react-native-fs';
import moment from 'moment/moment';

class RNCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            currentImage: null
        };
    }

    async takePicture() {
        const options = {};
        const { path: currentImage } = await this.camera.capture({ metadata: options });
        this.setState({ currentImage });
    }

    back() {
        this.setState({ currentImage: null, hidden: true });
    }

    async check() {
        const [date, unixTime] = [moment().format('YYYY/MM/DD'), moment().unix()];
        const dir = `${RNFS.DocumentDirectoryPath}/photo/${date}`;
        await mkdir(dir);
        const url = `${dir}/${unixTime}.jpg`;
        await RNFS.moveFile(this.state.currentImage, url);
        console.log(await readPath(dir));
        this.setState({ currentImage: null });
    }

    cancel() {
        deleteFile(this.state.currentImage);
        this.setState({ currentImage: null });
    }


    render() {
        const { currentImage, hidden } = this.state;
        console.log(currentImage);
        return (
                <View style={[styles.container, hidden && styles.hidden]}>
                    {currentImage ? <ImageBackground style={styles.photo} source={{ uri: currentImage }}>
                            <TouchableOpacity style={styles.capture} onPress={() => this.cancel()}>
                                <Icon name="close" size={30}/>
                            </TouchableOpacity >
                            <TouchableOpacity style={styles.capture} onPress={() => this.check()}>
                                <Icon name="check" size={30}/>
                            </TouchableOpacity >
                            </ImageBackground >
                            : <Camera ref={(cam) => {
                                this.camera = cam;
                            }}
                                      style={styles.preview}
                                      aspect={Camera.constants.Aspect.fill}
                                      captureTarget={Camera.constants.CaptureTarget.temp}
                            >
                            <TouchableOpacity style={styles.capture} onPress={() => this.back()}>
                                <Icon name="expand-more" size={30}/>
                            </TouchableOpacity >
                            <TouchableOpacity style={styles.capture} onPress={() => this.takePicture()}>
                                <Icon name="camera-alt" size={30}/>
                            </TouchableOpacity >
                            </Camera >
                    }
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
                alignItems: 'flex-end'
            },
            capture: {
                flex: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 25,
                // color: '#000',
                margin: 20,
                marginBottom: 30,
                width: 50,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1
            },
            photo: {
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'flex-end'
            },
            hidden: {
                display: 'none'
            }
        }
);

export default RNCamera;