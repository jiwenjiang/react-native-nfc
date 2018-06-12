import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import RNFS from 'react-native-fs';
import moment from 'moment';
import mkdir from '../../service/utils/mkdir';

class Home extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.storageFile();

        // console.log(date);
        // console.log(`${RNFS.DocumentDirectoryPath}/photo/${date}`);
        //
        // RNFS.exists(`${RNFS.DocumentDirectoryPath}/photo/${date}`)
        //         .then(result => {
        //             console.log(result);
        //         });
        RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
                .then((result) => {
                    console.log('GOT RESULT', result);

                    // stat the first file
                });
    }

    async storageFile() {
        const date = moment().format('YYYY-MM-DD');
        const url = `${RNFS.DocumentDirectoryPath}/photo/${date}`;
        const re = await mkdir(url);
        console.log(re);
    }

    render() {
        // const { navigate } = this.props.navigation;
        return (
                <View style={styles.container}>
                <Text style={{ padding: 10 }}>upload!</Text >
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