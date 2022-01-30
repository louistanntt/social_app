import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SignUpScreen, ActivateScreen } from '../screens/authentication';

const AuthStack = createNativeStackNavigator();

const AuthRoute = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="Activate" component={ActivateScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthRoute;
