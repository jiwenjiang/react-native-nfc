import RNFS from 'react-native-fs';

const mkdir = async (url) => {
    const dirExists = await RNFS.exists(url);
    if (dirExists) {
        return new Promise(resolve => resolve(dirExists));
    }
    await RNFS.mkdir(url);
    return new Promise(resolve => resolve(url));
};

const readPath = async (url) => {
    try {
        let files = await RNFS.readDir(url);
        return new Promise(resolve => resolve(files));
    }
    catch (e) {
        console.error(e);
        throw Error(`目录${url}不存在`);
    }
};

const deleteFile = async (url) => {
    try {
        await RNFS.unlink(url);
        console.log(url);
        return new Promise(resolve => resolve(url));
    }
    catch (e) {
        console.error(e);
        throw Error(`删除文件失败!`);
    }
};

export { mkdir, readPath, deleteFile };
