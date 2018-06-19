import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import RNFS from 'react-native-fs';

class Home extends PureComponent {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log(RNFS);
        // RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        //         .then((result) => {
        //             console.log('GOT RESULT', result);
        //
        //             // stat the first file
        //         })
    }

    render() {
        // const { navigate } = this.props.navigation;
        return (
                <View style={styles.container}>
                <Text style={{ padding: 10 }}>Setting!</Text >
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