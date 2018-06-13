import RNFS from 'react-native-fs';

const mkdir = async (url) => {
    const dirExists = await RNFS.exists(url);
    if (dirExists) {
        return new Promise(resolve => resolve(dirExists));
    }
    await RNFS.mkdir(url);
    return new Promise(resolve => resolve(url));
};
export default mkdir;