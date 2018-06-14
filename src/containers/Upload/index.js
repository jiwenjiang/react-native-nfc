import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    Button
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PHOTO_VIEWS_ACTION } from '../../redux/action';
import RNFS from 'react-native-fs';
import moment from 'moment';
import { mkdir, readPath } from '../../service/utils/fileOperations';
import RNCamera from '../../components/RNCamera';

async function storageFile() {
    const date = moment().format('YYYY/MM/DD');
    const url = `${RNFS.DocumentDirectoryPath}/photo/${date}`;
    await mkdir(url);
    const files = await readPath(url);
    return files;
}

class Upload extends PureComponent {
    static navigationOptions = {
        tabBarOnPress: async ({ defaultHandler, navigation }) => {
            const { navigate } = navigation;
            const files = await storageFile();
            navigate('Upload', { files });
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
    }


    async takePicture(data) {
        const [date, unixTime] = [moment().format('YYYY/MM/DD'), moment().unix()];
        const url = `${RNFS.DocumentDirectoryPath}/photo/${date}/${unixTime}.jpg`;
        await RNFS.moveFile(data.path, url);
        await RNFS.readDir(`${RNFS.DocumentDirectoryPath}/photo/${date}`).then((r) => {
            console.log('result', r);
        });
    }

    render() {
        const { files } = this.props.navigation.state.params;
        const cameraProps = {
            takePicture: this.takePicture
        };

        return (
                <View style={styles.container}>
                    <Button
                            onPress={() => this.onFileUpload()}
                            title="拍照"
                    />
                    <RNCamera {...cameraProps}/>
                     <Button
                             onPress={() => this.onFileUpload()}
                             title="拍照2"
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
            },
            photo: {
                width: 50,
                height: 50
            }
        }
);
const mapStateToProps = state => {
    return {
        photoViews: state.PHOTO_VIEWS_REDUCER
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPhotos: PHOTO_VIEWS_ACTION }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);