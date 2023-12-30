/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  Linking,
} from 'react-native';

export const Input = (props: any) => {
  const {label, placehodler, value, shortLine, secure, onChangeText} = props;
  const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
    },
    lineStyle: {
      height: 0.5,
      backgroundColor: '#D0D4D4',
      marginLeft: shortLine ? 20 : 0,
    },
    inputLabel: {
      marginLeft: 15,
      marginTop: 18,
      marginBottom: 18,
      fontSize: 16,
      width: 90,
    },
    input: {
      flex: 1,
      marginRight: 15,
    },
  });
  return (
    <View style={{backgroundColor: 'white'}}>
      <View style={styles.row}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
          style={styles.input}
          placeholder={placehodler}
          secureTextEntry={secure}
          autoCapitalize={'none'}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
      <View style={styles.lineStyle} />
    </View>
  );
};

export const ConfirmButton = (props: any) => {
  const {title, onClick} = props;
  const styles = StyleSheet.create({
    confirmLayout: {
      backgroundColor: '#2196F3',
      alignItems: 'center',
      padding: 12,
      margin: 20,
      marginTop: 30,
      borderRadius: 5,
    },
    confirmTitle: {
      fontSize: 20,
      color: 'white',
    },
  });
  return (
    <TouchableOpacity style={styles.confirmLayout} onPress={onClick}>
      <Text style={styles.confirmTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export const Tips = (props: any) => {
  const {msg, helpUrl} = props;
  const styles = StyleSheet.create({
    tipsLayout: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    tips: {
      fontSize: 14,
      color: 'red',
    },
  });
  return (
    <View style={styles.tipsLayout}>
      <Text style={styles.tips}>{msg}</Text>
      {!!helpUrl && (
        <Button
          title="查看帮助"
          onPress={() => {
            Linking.openURL(helpUrl);
          }}
        />
      )}
    </View>
  );
};

export const NavBar = (props: any) => {
  const {title, rightTitle, onRightClick} = props;
  const styles = StyleSheet.create({
    navBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 44,
    },
    titleLayout: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: 40,
      right: 40,
      top: 0,
      bottom: 0,
    },
    title: {
      fontSize: 20,
      color: 'black',
    },
    button: {
      color: '#007AFF',
      paddingRight: 15,
      fontSize: 16,
    },
  });
  return (
    <View style={styles.navBar}>
      <View />
      <View style={styles.titleLayout}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={onRightClick}>
        <Text style={styles.button}>{rightTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};
