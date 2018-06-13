import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PHOTO_VIEWS_ACTION } from '../../redux/action';
import RNFS from 'react-native-fs';
import moment from 'moment';
import mkdir from '../../service/utils/mkdir';
import readPath from '../../service/utils/readPath';
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
        // this.storageFile();
        // RNFS.readDir(`${RNFS.DocumentDirectoryPath}/photo/${moment().format('YYYY/MM/DD')}`)
        //         .then((result) => {
        //             console.log(`${RNFS.DocumentDirectoryPath}/photo/${moment().format('YYYY/MM/DD')}`, result);
        //         });
    }


    takePicture(data) {

        const date = moment().format('YYYY/MM/DD');
        const unixTime = moment().unix();
        const url = `${RNFS.DocumentDirectoryPath}/photo/${date}/${unixTime}.jpg`;
        RNFS.moveFile(data.path, url).then((result) => {
            RNFS.readDir(`${RNFS.DocumentDirectoryPath}/photo/${date}`).then((r) => {
                console.log('result', r);
            });
        });
    }

    render() {
        // const { navigate } = this.props.navigation;
        const cameraProps = {
            takePicture: this.takePicture
        };

        return (
                <View style={styles.container}>
                    <Text style={{ padding: 10 }}>upload!</Text >
                    <RNCamera {...cameraProps}/>
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
const mapStateToProps = state => {
    return {
        photoViews: state.PHOTO_VIEWS_REDUCER
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ getPhotos: PHOTO_VIEWS_ACTION }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Upload);