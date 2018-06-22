import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    Image,
    Button
} from 'react-native';
// import CameraButton from '../../components/CameraButton';
import { mkdir, readPath } from '../../service/utils/fileOperations';
import RNFS from 'react-native-fs';
import moment from 'moment/moment';

async function storageFile() {
    const date = moment().format('YYYY/MM/DD');
    const url = `${RNFS.DocumentDirectoryPath}/photo/${date}`;
    await mkdir(url);
    const files = await readPath(url);
    return files;
}

class Home extends PureComponent {
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

    onFileUpload(file, fileName) {
        console.log(file);
    }

    render() {
        const { files } = this.props.navigation.state.params;
        return (
                <View style={styles.container}>
                    <Image style={styles.photo}
                           source={{ uri: `file://${files[0].path}` }}
                    />
                     <Button
                             onPress={this.onFileUpload}
                             title="拍照"
                             color="#841584"
                     />
                    {/*<CameraButton style={styles.cameraBtn}*/}
                    {/*photos={[]}*/}
                    {/*onFileUpload={this.onFileUpload}*/}
                    {/*/>*/}
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


export default Home;