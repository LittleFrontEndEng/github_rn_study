import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {StyleSheet} from 'react-native';
const Tab = createMaterialTopTabNavigator();
const styles = StyleSheet.create({
  tabStyle: {
    padding: 0,
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white',
  },
  labelStyle: {
    textTransform: 'none', // 取消大小写
    fontSize: 13,
    margin: 0,
  },
});
function _genTabs({Component, keys, theme, extra = {}} = {}) {
  const tabs = {};
  keys.forEach((item, idnex) => {
    if (item.checked) {
      tabs[`tab${idnex}`] = {
        screen: props => (
          <Component {...props} {...extra} tabLabel={item.name} theme={theme} />
        ),
        navigationOptions: {
          title: item.name,
        },
      };
    }
  });
  return tabs;
}
export function tabNav({Component, keys, theme, extra} = {}) {
  return (
    <Tab.Navigator
      screenOptions={{
        lazy: true,
        tabBarItemStyle: styles.tabStyle,
        tabBarScrollEnabled: true, // 支持滚动
        tabBarInactiveTintColor: 'white',
        tabBarActiveTintColor: 'white',
        tabBarStyle: {
          backgroundColor: theme.themeColor, // TabBar背景色
        },
        tabBarIndicatorStyle: styles.indicatorStyle, // 标签指示器颜色
        tabBarLabelStyle: styles.labelStyle,
      }}>
      {Object.entries(_genTabs({Component, keys, theme, extra})).map(item => {
        return (
          <Tab.Screen
            name={item[0]}
            key={item[0]}
            component={item[1].screen}
            options={item[1].navigationOptions}
          />
        );
      })}
    </Tab.Navigator>
  );
}
