import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// import AntIcon from 'react-native-vector-icons/AntDesign';
import {navigationRef} from './src/navigation/NavigationService';
import Login from './src/components/Login';

const Application = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Login />
    </NavigationContainer>
  );
};

export default Application;
