import React, { useCallback, useEffect, useState } from 'react';
import { View, Appearance, ColorSchemeName } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/service/navigationService';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthRoute from './src/routes/AuthRoute';
import MainRoute from './src/routes/MainRoute';
import { useAppSelector } from './src/utilities/functions/common';
import { useDispatch } from 'react-redux';
import { setMode, setLanguage, setToken, setRemember } from './src/redux/slices/settingsSlice';
import LoadingScreen from './src/screens/LoadingScreen';
import { config } from './src/config/general';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import ToastCustom from './src/components/ToastCustom';
const RootStack = createNativeStackNavigator();

interface RootProps {}

const Root: React.FC<RootProps> = props => {
  const {} = props;
  const dispatch = useDispatch();
  const settings = useAppSelector(state => state.settings);
  const isLoggedIn = useAppSelector(state => state.settings.token);
  const isRemember = useAppSelector(state => state.settings.remember);

  const [theme, setTheme] = useState<ColorSchemeName>(Appearance.getColorScheme());
  const [isRendering, setIsRendering] = useState<boolean>(true);

  const getUserSettings = useCallback(async () => {
    try {
      let storeSettings = await AsyncStorage.getItem('settings');
      if (storeSettings != null) {
        const parsedSettings = JSON.parse(storeSettings);
        dispatch(setMode(parsedSettings?.mode));
        dispatch(setLanguage(parsedSettings?.language));
      } else {
        Appearance.addChangeListener(scheme => {
          setTheme(scheme.colorScheme);
        });
        dispatch(setMode(theme));
        dispatch(setLanguage(config.defaultLang));
        await AsyncStorage.setItem('settings', JSON.stringify(settings));
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getUserToken = useCallback(async () => {
    try {
      let accessToken = await AsyncStorage.getItem('token');
      let remembered = await AsyncStorage.getItem('remember');
      if (accessToken) {
        dispatch(setToken(accessToken));
      }
      if (remembered) {
        dispatch(setRemember(JSON.parse(remembered)));
      }
      setIsRendering(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUserSettings();
    getUserToken();
  }, []);

  if (isRendering) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn && isRemember ? (
            <>
              <RootStack.Screen name="Main" component={MainRoute} />
              <RootStack.Screen name="Auth" component={AuthRoute} />
            </>
          ) : (
            <>
              <RootStack.Screen name="Auth" component={AuthRoute} />
              <RootStack.Screen name="Main" component={MainRoute} />
            </>
          )}
        </RootStack.Navigator>
      </NavigationContainer>
      {/* <ToastCustom /> */}
    </View>
  );
};

export default Root;
