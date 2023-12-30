/* eslint-disable no-shadow */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {Component} from 'react';

import PopularPage from './../../pages/PopularPage';
import TrendingPage from './../../pages/TrendingPage';
import FavoritePage from './../../pages/FavoritePage';
import MyPage from './../../pages/MyPage';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
const Tab = createBottomTabNavigator();
const TABS = {
  // 配置页面路由
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      headerShown: false,
      tabBarIcon: ({color, focused}) => (
        <MaterialIcons name="whatshot" size={26} style={{color: color}} />
      ),
    },
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      headerShown: false,
      tabBarIcon: ({color, focused}) => (
        <Ionicons name="trending-up" size={26} style={{color: color}} />
      ),
    },
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      headerShown: false,
      tabBarIcon: ({color, focused}) => (
        <MaterialIcons name="favorite" size={26} style={{color: color}} />
      ),
    },
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '我的',
      headerShown: false,
      tabBarIcon: ({color, focused}) => (
        <Entypo name="user" size={26} style={{color: color}} />
      ),
    },
  },
};

class DynamicTabNavigator extends Component {
  _tabNavigator() {
    const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
    const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage};
    // PopularPage.navigationOptions.tabBarLabel = '最热1'; // 动态改变属性
    const themeColor = this.props.themeColor || this.props.theme;
    return (
      <Tab.Navigator>
        {Object.entries(tabs).map(item => {
          return (
            <Tab.Screen
              key={item[0]}
              name={item[0]}
              component={item[1].screen}
              options={{
                ...item[1].navigationOptions,
                tabBarActiveTintColor: themeColor,
              }}
            />
          );
        })}
      </Tab.Navigator>
    );
  }
  render() {
    const Tab = this._tabNavigator();
    return Tab;
  }
}
const mapStateToProps = state => ({
  theme: state.theme.theme,
});
export default connect(mapStateToProps)(DynamicTabNavigator);
