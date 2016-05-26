import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity
} from 'react-native';

const NavigationBarRouteMapper = {
  // 左键
  LeftButton(route, navigator, index, navState) {
    if (index == 0) {
      return null;
    }

    return (
      <View style={styles.navContainer}>
        <TouchableOpacity
          underlayColor='transparent'
          onPress={() => navigator.pop()}>
          {(() => {
            if (route.type == 'Modal') {
              return (
                <Text style={styles.leftNavButtonText}>
                  关闭
                </Text>
              )
            }
            return (
              <Text style={styles.leftNavButtonText}>
                返回
              </Text>
            )
        })()}
        </TouchableOpacity>
      </View>
    );
  },
  // 右键
  RightButton(route, navigator, index, navState) {
    if (route.onPress)
      return (
        <View style={styles.navContainer}>
          <TouchableOpacity
            onPress={() => route.onPress()}>
            <Text style={styles.rightNavButtonText}>
              {route.rightText || ''}
            </Text>
          </TouchableOpacity>
        </View>
      );
  },
  // 标题
  Title(route, navigator, index, navState) {
    return (
      <View style={styles.navContainer}>
        <Text style={styles.title}>
          {route.title || 'App标题'}
        </Text>
      </View>
    );
  }
};

class RNSimpleNavDemo extends Component {
  /**
   * 使用动态页面加载
   * @param route 路由
   * @param navigator 导航器
   * @returns {XML} 页面
   */
  renderScene(route, navigator) {
    return <route.component navigator={navigator}  {...route.passProps} />;
  }

  configureScene(route, routeStack) {
    if (route.type == 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'HomePage', component: HomePage}}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navContainer}
            routeMapper={NavigationBarRouteMapper}/>}
        />
    );
  }
}

class HomePage extends Component {
  render() {
    // 点击按钮使用Home页面入栈
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#ff1049'}]}
          onPress={()=>this.props.navigator.push({
            component: DetailPage,
            passProps: {
              text: 'id=1的详情页'
            },
            title: '详情'
          })}>
          <Text style={styles.buttonText}>
            详情
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>this.props.navigator.push({
            component: LoginPage,
            passProps: {
              text: '你注册了吗'
            },
            onPress: ()=> Alert.alert(
              '提示',
              'Hello'
            ),
            title: '登录',
            rightText: '注册',
            type: 'Modal'
          })}>
          <Text style={styles.buttonText}>
            登录
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class DetailPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>这个是详情页面 传的值是 {this.props.text}</Text>
      </View>
    );
  }
}

class LoginPage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>这个是登录页面 传的值是 {this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // 页面框架
  container: {
    flex: 4,
    marginTop: 200,
    flexDirection: 'column'
  },
  // 导航栏
  navContainer: {
    backgroundColor: '#6DB82D',
    paddingTop: 12,
    paddingBottom: 5,
  },
  // 标题
  title: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    flex: 1
  },

  // 按钮
  button: {
    height: 40,
    marginTop: 10,
    justifyContent: 'center', // 内容居中显示
    backgroundColor: '#48BBEC',
    alignItems: 'center'
  },
  // 按钮文字
  buttonText: {
    fontSize: 18,
    color: '#ffffff'
  },
  // 左面导航按钮
  leftNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 10
  },
  // 右面导航按钮
  rightNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 13
  }
});

export default RNSimpleNavDemo;
