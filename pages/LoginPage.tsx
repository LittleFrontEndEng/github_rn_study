/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Linking} from 'react-native';
import {Input, ConfirmButton, Tips, NavBar} from '../components/LoginComponent';
import Constants from './../js/expand/dao/Constants';
import LoginDao from '../js/expand/dao/LoginDao';
import SignUpDao from '../js/expand/dao/SignUpDao';
import NavigationUtil from '../js/navigator/NavigationUtil';
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingTop: 20,
    backgroundColor: '#F1F5F6',
    flexGrow: 1,
  },
  line: {
    height: 0.5,
    backgroundColor: '#D0D4D4',
  },
});
const LoginPage = (props: any) => {
  const {navigation} = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [msgInfo, setMsg] = useState('');
  const [helpUrlInfo, setHelpUrl] = useState('https://www.baidu.com/');

  const onLogin = () => {
    if (userName === '') {
      setMsg('用户名不能为空');
      return;
    }
    if (password === '') {
      setMsg('密码不能为空');
      return;
    }
    setHelpUrl('');
    setMsg('');
    debugger;
    LoginDao.getInstance()
      .login(userName, password)
      .then(res => {
        setMsg('登录成功');
        NavigationUtil.resetToHomePage({navigation});
      })
      .catch(e => {
        const {code, data: {helpUrl = ''} = {}, msg} = e;
        console.log(e);

        setMsg(msg);
        setHelpUrl(helpUrl);
      });
  };
  return (
    <SafeAreaView style={styles.root}>
      <NavBar
        title="登录"
        rightTitle="注册"
        onRightClick={() => {
          setHelpUrl('');
          setMsg('');
          setUserName('');
          setPassword('');
          NavigationUtil.resetToRegistrationPage({navigation});
        }}
      />
      <View style={styles.line} />
      <View style={styles.content}>
        <Input
          label="用户名"
          placehodler="请输入用户名"
          shortLine={true}
          value={userName}
          onChangeText={(text: string) => setUserName(text)}
        />
        <Input
          label="密码"
          placehodler="请输入密码"
          secure={true}
          value={password}
          onChangeText={(text: string) => setPassword(text)}
        />
        <ConfirmButton title="登录" onClick={onLogin} />
        <Tips msg={msgInfo} helpUrl={helpUrlInfo} />
        {/* <MaterialIcons name={'whatshot'} size={26} style={{color: 'red'}} /> */}
      </View>
    </SafeAreaView>
  );
};

export default LoginPage;
