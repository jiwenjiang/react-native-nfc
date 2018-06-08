import React, { PureComponent } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';

class Home extends PureComponent {

    static navigationOptions = {
        title: '首页',//设置标题内容
        header: {
            backTitle: ' '//返回按钮标题内容（默认为上一级标题内容）
        }
    };

    constructor(props) {
        super(props);
    }

    render() {
        // const { navigate } = this.props.navigation;
        return (
                <View style={styles.container}>
                <Text style={{ padding: 10 }}>Hello, NFC!</Text >
                <Button
                        onPress={() => console.log(666)}
                        title="点击跳转"
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
            icon: {
                height: 22,
                width: 22,
                resizeMode: 'contain'
            }
        }
);


export default Home;