import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import RNFS from 'react-native-fs';
import moment from 'moment';
import mkdir from '../../service/utils/mkdir';
import RNCamera from '../../components/RNCamera';

class Home extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.storageFile();
        RNFS.readDir(`${RNFS.DocumentDirectoryPath}/photo/${moment().format('YYYY-MM-DD')}`)
                .then((result) => {
                    console.log(`${RNFS.DocumentDirectoryPath}/photo/${moment().format('YYYY-MM-DD')}`, result);
                });
    }

    async storageFile() {
        const date = moment().format('YYYY-MM-DD');
        const url = `${RNFS.DocumentDirectoryPath}/photo/${date}`;
        await mkdir(url);
    }

    takePicture(data) {

        const date = moment().format('YYYY-MM-DD');
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


export default Home;