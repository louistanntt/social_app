import React, { useCallback, useEffect, useState } from 'react';
import { View, Appearance, ColorSchemeName } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/service/navigationService';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthRoute from './src/routes/AuthRoute';
import MainRoute from './src/routes/MainRoute';
import { useAppSelector } from './src/utilities/functions/common';
import { useDispatch } from 'react-redux';
import { setMode, setLanguage } from './src/redux/slices/settingsSlice';
import LoadingScreen from './src/screens/LoadingScreen';
import settingsAction from './src/redux/slices/settingsSlice';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from './src/config/general';
import { commonEn, generalEn, errorEn, successEn } from './src/locales/en/index';
import { commonVi, generalVi, errorVi, successVi } from './src/locales/vi/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import ToastCustom from './src/components/ToastCustom';
const RootStack = createNativeStackNavigator();

interface RootProps {}

const Root: React.FC<RootProps> = props => {
  const {} = props;
  const dispatch = useDispatch();
  const settings = useAppSelector(state => state.settings);

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
  }, [settings]);

  useEffect(() => {
    getUserSettings();
  }, []);

  useEffect(() => {
    (async () => {
      await i18next.use(initReactI18next).init({
        compatibilityJSON: 'v3',
        lng: settings?.language,
        debug: __DEV__,
        resources: {
          vi: {
            common: commonVi,
            general: generalVi,
            success: successVi,
            error: errorVi,
          },
          en: {
            common: commonEn,
            general: generalEn,
            success: successEn,
            error: errorEn,
          },
        },
      });
      setIsRendering(false);
    })();
  }, []);

  if (isRendering) {
    return <LoadingScreen />;
  }
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={navigationRef}>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Auth" component={AuthRoute} />
          <RootStack.Screen name="Main" component={MainRoute} />
        </RootStack.Navigator>
      </NavigationContainer>
      <ToastCustom />
    </View>
  );
};

export default Root;
