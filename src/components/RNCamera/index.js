import React, { Component } from 'react';
import {
    StyleSheet,
    ImageBackground,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { deleteFile, mkdir } from '../../service/utils/fileOperations';
import RNFS from 'react-native-fs';
import moment from 'moment/moment';
import Mask from '../Mask';

class JCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            currentImage: null,
            mask: false
        };
    }

    async takePicture() {
        this.setState({ mask: true });
        const options = { quality: 0.5, skipProcessing: true };
        const { uri: currentImage } = await this.camera.takePictureAsync(options);
        this.setState({ currentImage, mask: false });
    }

    back() {
        const { navigation } = this.props;
        navigation.goBack();
        this.setState({ currentImage: null, hidden: true });
    }

    async check() {
        const [date, unixTime] = [moment().format('YYYY/MM/DD'), moment().unix()];
        const dir = `${RNFS.DocumentDirectoryPath}/photo/${date}`;
        await mkdir(dir);
        const url = `${dir}/${unixTime}.jpg`;
        await RNFS.moveFile(this.state.currentImage, url);
        this.setState({ currentImage: null });
    }

    cancel() {
        deleteFile(this.state.currentImage);
        this.setState({ currentImage: null });
    }


    render() {
        const { currentImage, hidden, mask } = this.state;
        const maskProps = {
            maskStyle: styles.centering
        };
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
                            : <RNCamera ref={(cam) => {
                                this.camera = cam;
                            }} style={styles.preview}
                            >
                            <TouchableOpacity style={styles.capture} onPress={() => this.back()}>
                                <Icon name="expand-more" size={30}/>
                            </TouchableOpacity >
                            <TouchableOpacity style={styles.capture} onPress={() => this.takePicture()}>
                                <Icon name="camera-alt" size={30}/>
                            </TouchableOpacity >
                            </RNCamera >
                    }
                    {
                        mask ? < Mask {...maskProps}>
                        <ActivityIndicator
                                size="large"
                                color="#4177F6"
                                style={[styles.centering]}
                        />
                        </Mask > : null
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
            },
            centering: {
                alignItems: 'center',
                justifyContent: 'center'
            }
        }
);

export default JCamera;