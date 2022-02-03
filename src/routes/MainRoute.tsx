import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/main';
import { WelcomeScreen, TestingScreen } from '../screens';

const MainStack = createNativeStackNavigator();

const MainRoute = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="Testing" component={TestingScreen} />
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Welcome" component={WelcomeScreen} />
    </MainStack.Navigator>
  );
};

export default MainRoute;
