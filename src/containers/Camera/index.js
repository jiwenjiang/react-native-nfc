import React, { Component } from 'react';
import JCamera from '../../components/RNCamera';
class Camera extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;
        console.log(navigation)
        const cameraProps = {
            // takePicture: this.takePicture,
            navigation
        };
        return (
                <JCamera {...cameraProps}/>
        );
    }
}

export default Camera;
