import React, { useEffect } from 'react';
import { ColorSchemeName, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/service/navigationService';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthRoute from './src/routes/AuthRoute';
import MainRoute from './src/routes/MainRoute';

import { useDispatch } from 'react-redux';
import { setMode } from './src/redux/slices/settingsSlice';

const RootStack = createNativeStackNavigator();

interface RootProps {
  theme: ColorSchemeName;
}

const Root: React.FC<RootProps> = props => {
  const { theme } = props;
  const dispatch = useDispatch();

  dispatch(setMode(theme));
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Auth" component={AuthRoute} />
          {/* <RootStack.Screen name="Main" component={MainRoute} /> */}
        </RootStack.Navigator>
      </NavigationContainer>
      {/* <Toast /> */}
    </View>
  );
};

export default Root;
