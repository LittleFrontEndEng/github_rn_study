import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Constants from './expand/dao/Constants';
import {post} from './expand/dao/HiNet';
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
const FetchPage = () => {
  const [msg, setMsg] = useState('');
  const doFetch = async () => {
    // fetch('https://api.devio.org/uapi/test/?requestPrams=aa')
    //   .then(res => res.json())
    //   .then(result => {
    //     setMsg(JSON.stringify(result));
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     setMsg(JSON.stringify(e));
    //   });
    // const result = await get(Constants.test.api)({requestPrams: 'RN'}).catch(
    //   e => {
    //     console.log(e);
    //     setMsg(JSON.stringify(e));
    //   },
    // );
    const formData = new FormData();
    formData.append('requestPrams', 'RN');
    const result = await post(Constants.test.api)(formData)().catch(e => {
      console.log(e);
      setMsg(JSON.stringify(e));
    });
    setMsg(JSON.stringify(result));
  };
  return (
    <SafeAreaView style={styles.root}>
      <TouchableOpacity onPress={doFetch}>
        <Text>加载</Text>
      </TouchableOpacity>
      <Text>{msg}</Text>
    </SafeAreaView>
  );
};

export default FetchPage;
