import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import useDeviceInfo from '../utilities/Device';

const Login = () => {
  const { windowHeight, windowWidth, isTablet, statusBarHeight } = useDeviceInfo();
  // const StatusBarManager.getHeight((statusBarHeight)=>{
  //   console.log(statusBarHeight)
  // })

  // for android
  // console.log(StatusBar.currentHeight);

  console.log(statusBarHeight, windowHeight, windowWidth, isTablet);
  return (
    <View style={styles.container}>
      <View style={[styles.mainScreen, { marginTop: statusBarHeight }]}>
        <Text>Hello world</Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
