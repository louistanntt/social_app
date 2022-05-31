import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  LoginScreen,
  RegisterScreen,
  AddInfoScreen,
  ActivateScreen,
  UploadAvatarScreen,
} from '../screens/authentication';

import { TestingScreen } from '../screens';

const AuthStack = createNativeStackNavigator();

const AuthRoute = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="AddInfo" component={AddInfoScreen} />
      <AuthStack.Screen name="Activate" component={ActivateScreen} />
      <AuthStack.Screen name="UploadAvatar" component={UploadAvatarScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthRoute;
