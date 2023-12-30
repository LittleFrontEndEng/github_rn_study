import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NavigationUtil from '../js/navigator/NavigationUtil';
import DynamicTabNavigator from '../js/navigator/DynamicTabNavigator';
import SafeAreaViewPlus from 'react-native-safe-area-plus';
import {connect} from 'react-redux';
class HomePage extends Component {
  render() {
    // 方便其他页面不传navigation
    NavigationUtil.navigation = this.props.navigation;
    const themeColor = this.props.theme.themeColor || this.props.theme;
    return (
      <SafeAreaViewPlus topColor={themeColor}>
        <DynamicTabNavigator />
      </SafeAreaViewPlus>
    );
  }
}
const mapStateToProps = state => ({
  theme: state.theme.theme,
});
export default connect(mapStateToProps)(HomePage);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
});
