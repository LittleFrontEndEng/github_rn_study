import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, StyleSheet, TextInput, Button, Text} from 'react-native';
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
const KEY = 'devio.org';
const AsyncStoragePage = () => {
  const [text, onChangeText] = useState('');
  const [showText, setShowText] = useState('');
  const onSave = async () => {
    try {
      await AsyncStorage.setItem(KEY, text);
    } catch (err) {
      console.log(err);
    }
  };
  const onGet = async () => {
    try {
      const values = await AsyncStorage.getItem(KEY);
      setShowText(values || '');
      console.log(values);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={styles.root}>
      <TextInput onChangeText={onChangeText} value={text} />
      <Button title={'Save'} onPress={onSave} />
      <Button title={'Get'} onPress={onGet} />
      <Text>Result:{showText}</Text>
    </SafeAreaView>
  );
};

export default AsyncStoragePage;
