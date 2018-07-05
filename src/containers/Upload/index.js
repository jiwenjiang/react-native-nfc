import React, { PureComponent } from "react";
import {
  StyleSheet,
  View,
  Image,
  SectionList,
  Text,
  Dimensions,
  TouchableOpacity,
  DatePickerAndroid,
  ActivityIndicator,
  Alert
} from 'react-native';
import { mkdir, readPath } from '../../service/utils/fileOperations';
import RNFS from 'react-native-fs';
import moment from 'moment/moment';

async function getFiles(day) {
  const date = day || moment().format('YYYY/MM/DD');
  const url = `${RNFS.DocumentDirectoryPath}/photo/${date}`;
  await mkdir(url);
  const files = await readPath(url);
  return { date, files };
}

class Upload extends PureComponent {
  static navigationOptions = {
    tabBarOnPress: async ({ defaultHandler, navigation }) => {
      const { navigate } = navigation;
      const { date, files } = await getFiles();
      navigate('Upload', { date, files });
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      startTime: moment().format('YYYY-MM-DD'),
      endTime: moment().format('YYYY-MM-DD'),
      isFetching: false
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
    this.setState(
          {
            sections: []
          }, () => {
            this.renderList(date, files);
          }
    );
  }

  onRefresh = async () => {
    const formatDate = this.state.endTime.replace(/\//g, "-");
    const date = moment(formatDate).format('YYYY/MM/DD');
    const { files } = await getFiles(date);
    await new Promise((res) => this.setState({ sections: [] }, () => {
      res();
    }));
    this.renderList(date, files, true);
  };

  renderList(date, files) {
    const fileList = files && files.map(v => {
      return {
        title: v.name,
        key: v.name,
        url: v.path
      };
    });
    const sections = [...this.state.sections, { key: date, data: [{ files: fileList }] }];
    this.setState({
                    sections,
                    date
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
    return <Text style={styles.head} key={e.section.key}>{e.section.key}</Text >;
  };

  async showPicker(type) {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open(
            {
              date: new Date()
            }
      );
      if (action !== DatePickerAndroid.dismissedAction) {
        const formatTime = moment(`${year}-${month + 1}-${day}`).format('YYYY-MM-DD');
        this.setState({ [type]: formatTime },
              () => {
                  if(type === 'endTime' ){
                    this.state.startTime > this.state.endTime
                          ? Alert.alert('Warning','开始时间大于结束时间',[
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                          ])
                          :null
                  }
              }
      );
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  };

  ListHeaderComponent = () => {
    const { startTime, endTime } = this.state;
    return <View style={styles.buttonBox}>
            <TouchableOpacity
                  style={styles.button}
                  underlayColor="#a5a5a5"
                  onPress={() => this.showPicker('startTime')}
            >
                <Text style={styles.buttonText}>{startTime}</Text >
            </TouchableOpacity >
            <TouchableOpacity
                  style={styles.button}
                  underlayColor="#a5a5a5"
                  onPress={() => this.showPicker('endTime')}
            >
                <Text style={styles.buttonText}>{endTime}</Text >
            </TouchableOpacity >
        </View >;
  };

  ListFooterComponent = () => {
    const { isFetching } = this.state;
    return (
          isFetching ?
                <View style={styles.container}>
                    <ActivityIndicator
                          animating={true}
                          size="large"
                          color="#4177F6"
                    />
                </View > : null
    );
  };

  fetchData = async () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.onEndReachedCalledDuringMomentum = true;
      const formatDate = this.state.date.replace(/\//g, "-");
      const date = moment(formatDate).subtract(1, 'days').format('YYYY/MM/DD');
      await new Promise((res) => this.setState({ isFetching: true }, () => {
        res();
      }));
      await new Promise((res) => setTimeout(() => {
        console.log('delay 1000ms');
        res();
      }, 1000));
      const { files } = await getFiles(date);
      this.renderList(date, files);
      this.setState({ isFetching: false }, () => {
        this.onEndReachedCalledDuringMomentum = false;
      });
    }
  };

  render() {
    return (
          <View style={styles.container}>
                <SectionList
                      ListHeaderComponent={this.ListHeaderComponent}
                      ListFooterComponent={this.ListFooterComponent}
                      renderSectionHeader={this.renderSectionHeader}
                      renderItem={this.renderItem}
                      sections={this.state.sections}
                      onRefresh={this.onRefresh}
                      refreshing={false}
                      onEndReachedThreshold={0.01}
                      keyExtractor={(item, index) => index}
                      onEndReached={this.fetchData}
                />
            </View >
    );
  }
}

const styles = StyleSheet.create(
      {
        container: {
          height: '100%',
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
        },
        buttonBox: {
          flex: 1,
          flexDirection: 'row'
        },
        button: {
          flex: 1,
          backgroundColor: 'white',
          padding: 15,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: '#cdcdcd'
        },
        buttonText: {
          justifyContent: 'center',
          textAlign: 'center'
        }
      }
);

export default Upload;
