import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    Image,
    Button,
    SectionList,
    Text,
    Dimensions
} from 'react-native';
import { mkdir, readPath } from '../../service/utils/fileOperations';
import RNFS from 'react-native-fs';
import moment from 'moment/moment';

async function storageFile(day) {
    const date = day || moment().format('YYYY/MM/DD');
    const url = `${RNFS.DocumentDirectoryPath}/photo/${date}`;
    await mkdir(url);
    const files = await readPath(url);
    return { date, files };
}

class Home extends PureComponent {
    static navigationOptions = {
        tabBarOnPress: async ({ defaultHandler, navigation }) => {
            const { navigate } = navigation;
            const { date, files } = await storageFile();
            navigate('Upload', { date, files });
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            sections: []
        };
    }

    componentDidMount() {
        this.navListener = this.props.navigation.addListener('didFocus', () => this._onFocus());
    }

    componentWillUnmount() {
        this.navListener.remove();
    }

    _onFocus() {
        const { date, files } = this.props.navigation.state.params;
        const fileList = files && files.map(v => {
            return {
                title: v.name,
                key: v.name,
                url: v.path
            };
        });
        const sections = [{ key: date, data: [{ files: fileList }] }];
        this.setState({
                          sections
                      });
    }

    renderItem = (e) => {
        return <View style={styles.list}>
                    {e.item.files && e.item.files.map((v) => <Image style={styles.photo} key={v.url}
                                                                    source={{ uri: `file://${v.url}` }}
                    />)}
               </View >;
    };

    renderSectionHeader = (e) => {
        return <Text style={styles.head}>{e.section.key}</Text >;
    };

    onRefresh = (e) => {
        console.log(e);
    };

    render() {
        return (
                <View style={styles.container}>
                      <SectionList
                              renderSectionHeader={this.renderSectionHeader}
                              renderItem={this.renderItem}
                              sections={this.state.sections}
                              onRefresh={this.onRefresh}
                              refreshing={false}
                      />
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
            list: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                overflow: 'hidden'
            },
            head: {
                height: 50,
                textAlignVertical: 'center',
                backgroundColor: '#4177F6',
                color: 'white',
                fontSize: 24
            },
            photo: {
                width: Dimensions.get('window').width / 4,
                height: Dimensions.get('window').width / 4,
                borderWidth: 0.5,
                borderColor: '#FFFFFF'
            }
        }
);

export default Home;
