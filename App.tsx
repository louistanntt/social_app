import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Appearance,
  ColorSchemeName,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store';
import Root from './Root';
// import { initializeI18n } from './src/locales/i18n';
import LoadingScreen from './src/screens/LoadingScreen';
import settingsAction from './src/redux/slices/settingsSlice';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { config } from './src/config/general';
import { commonEn, generalEn, errorEn, successEn } from './src/locales/en/index';
import { commonVi, generalVi, errorVi, successVi } from './src/locales/vi/index';

const App = () => {
  const [theme, setTheme] = useState<ColorSchemeName>(Appearance.getColorScheme());

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme);
  });

  const [isRendering, setIsRendering] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      await i18next.use(initReactI18next).init({
        compatibilityJSON: 'v3',
        lng: config.defaultLang,
        debug: __DEV__,
        resources: {
          en: {
            common: commonEn,
            general: generalEn,
            success: successEn,
            error: errorEn,
          },
          vi: {
            common: commonVi,
            general: generalVi,
            success: successVi,
            error: errorVi,
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
    <Provider store={store}>
      <Root theme={theme} />
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
