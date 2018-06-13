import RNFS from 'react-native-fs';

const readPath = async (url) => {
    try {
        let files = await RNFS.readDir(url);
        return new Promise(resolve => resolve(files));
    }
    catch (e) {
        throw Error(`目录${url}不存在`);
    }
};
export default readPath;