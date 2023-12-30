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
const RegistrationPage = (props: any) => {
  const {navigation} = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [msgInfo, setMsg] = useState('');
  const [helpUrlInfo, setHelpUrl] = useState('https://www.baidu.com/');
  const [isSignIn, setIsSign] = useState(true);
  const [imoocId, setImoocId] = useState('');
  const [orderId, setOrderId] = useState('');

  const onLogin = () => {
    if (userName === '') {
      setMsg('用户名不能为空');
      return;
    }
    if (password === '') {
      setMsg('密码不能为空');
      return;
    }
    if (!isSignIn && imoocId === '') {
      setMsg('用户ID不能为空');
      return;
    }
    if (!isSignIn && orderId === '') {
      setMsg('订单号不能为空');
      return;
    }
    setHelpUrl('');
    setMsg('');
    // 注册接口
    SignUpDao.getInstance()
      .signup(userName, password, imoocId, orderId)
      .then(res => {
        setMsg('注册成功');
        NavigationUtil.resetToLoginPage({navigation});
      })
      .catch(e => {
        const {code, data: {helpUrl = ''} = {}, msg} = e;
        setMsg(msg);
        setHelpUrl(helpUrl);
      });
  };
  return (
    <SafeAreaView style={styles.root}>
      <NavBar
        title="注册"
        rightTitle="登录"
        onRightClick={() => {
          NavigationUtil.resetToLoginPage({navigation});
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
        <Input
          label="用户ID"
          placehodler="请输入用户ID"
          value={imoocId}
          onChangeText={(text: string) => setImoocId(text)}
        />
        <Input
          label="订单号"
          value={orderId}
          placehodler="请输入订单号"
          onChangeText={(text: string) => setOrderId(text)}
        />
        <ConfirmButton title="注册" onClick={onLogin} />
        <Tips msg={msgInfo} helpUrl={helpUrlInfo} />
      </View>
    </SafeAreaView>
  );
};

export default RegistrationPage;
