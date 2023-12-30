import {StackActions} from '@react-navigation/native';
export default class NavigationUtil {
  /**
   * 跳转指定页面
   * @param {*} params 参数
   * @param {*} page 目标页面
   */
  static goPage(params, page) {
    const navigation = NavigationUtil.navigation || (params || {}).navigation;
    if (!navigation) {
      console.log('NavigationUtil.navigation can not be null !!!');
      return;
    }
    navigation.navigate(page, {
      ...params,
      navigation: undefined,
    });
  }

  /**
   * 返回上一页
   * @param {*} navigation
   */
  static goBack(navigation) {
    navigation.goBack();
  }

  static resetToHomePage(params) {
    const {navigation} = params;
    navigation.dispatch(StackActions.replace('HomePage', {}));
  }

  static resetToLoginPage(params) {
    let {navigation} = params;
    if (!navigation) {
      navigation = NavigationUtil.navigation;
    }
    navigation.dispatch(StackActions.replace('LoginPage', {}));
  }

  static resetToRegistrationPage(params) {
    let {navigation} = params;
    if (!navigation) {
      navigation = NavigationUtil.navigation;
    }
    navigation.dispatch(StackActions.replace('RegistrationPage', {}));
  }
}
