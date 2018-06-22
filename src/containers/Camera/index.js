import React, { Component } from 'react';
import RNCamera from '../../components/RNCamera';
// import moment from 'moment/moment';
// import RNFS from 'react-native-fs';

class Camera extends Component {
    constructor(props) {
        super(props);
    }

    // async takePicture(data) {
    //     const [date, unixTime] = [moment().format('YYYY/MM/DD'), moment().unix()];
    //     const url = `${RNFS.DocumentDirectoryPath}/photo/${date}/${unixTime}.jpg`;
    //     await RNFS.moveFile(data.path, url);
    //     await RNFS.readDir(`${RNFS.DocumentDirectoryPath}/photo/${date}`).then((r) => {
    //         console.log('result', r);
    //     });
    // }

    render() {
        const { navigation } = this.props;
        const cameraProps = {
            // takePicture: this.takePicture,
            navigation
        };
        return (
                <RNCamera {...cameraProps}/>
        );
    }
}

export default Camera;
