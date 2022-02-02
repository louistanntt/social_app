import React, { useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import useDeviceInfo from '../../../utilities/hooks/useDeviceInfo';
import {
  TextField,
  ButtonFill,
  Button,
  CheckBox,
  AlertModal,
  TextAdvance,
} from '../../../components';
// import { colors, configInstance } from '../../../config';
import useKeyboard from '../../../utilities/hooks/useKeyboard';
import { moderateScale, scale, verticalScale } from '../../../utilities/functions/scaling';
import { toast } from '../../../utilities/functions/toast';
import { navigate } from '../../../service/navigationService';
import { useAppDispatch, useAppSelector } from '../../../utilities/functions/common';
import { setLanguage } from '../../../redux/slices/settingsSlice';
import { useTranslation } from 'react-i18next';
import { LoginProps } from '../../../shared/type';
import { loginAPI } from '../../../api/authentication/loginAPI';
import configInstance from '../../../config/environment';
import colors from '../../../config/colors';
import { darkMode, lightMode } from './styles';
import { saveToken } from '../../../utilities/functions/tokenStorage';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { windowHeight, windowWidth, isTablet, statusBarHeight, isLandscape, hasNotch } =
    useDeviceInfo(true);
  const mode = useAppSelector(state => state.settings.mode);
  const { keyboardShown } = useKeyboard();
  // const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation('general');

  const [user, setUser] = useState<LoginProps>({
    email: '',
    password: '',
    remember_me: false,
  });
  const [show, setShow] = useState<boolean>(false);

  const onLogin = async () => {
    if (!user.email || !user.password) {
      toast(t('validateUser'), 'error');
    } else {
      let email = user.email;
      if (process.env.NODE_ENV === 'development') {
        if (!email.includes('@gmail.com')) {
          email = `${user.email}@gmail.com`;
        }
      }
      const res = await loginAPI({
        email: email,
        password: user.password,
        remember_me: user.remember_me,
      });
      saveToken(res.data.access_token);
      if (!res.data?.user_info.active) {
        // navigate('Main');
        navigate('Activate');
      } else {
        setShow(true);
      }
    }
  };

  const onChangeLanguage = (newLanguage: string): void => {
    i18n.changeLanguage(newLanguage);
    dispatch(setLanguage(newLanguage));
  };

  const [test, setTest] = useState<string>('');

  return (
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <ButtonFill text="A" onPress={() => setShow(!show)} />

    // </View>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[
        mode === 'light' ? lightMode.container : darkMode.container,
        {
          paddingTop: statusBarHeight,
        },
      ]}
    >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={{ fontSize: 40, color: colors.primary }}>social</Text>
        </View>
        <View style={styles.footer}>
          <View>
            {/* <TextField
              value={user.email}
              placeHolder={t('email')}
              isFocus
              onChangeText={e => {
                setUser({
                  ...user,
                  email: e,
                });
              }}
            />
            <TextField
              value={user.password}
              placeHolder={t('password')}
              isFocus
              style={{ marginTop: verticalScale(30) }}
              onChangeText={e => {
                setUser({
                  ...user,
                  password: e,
                });
              }}
              secureTextEntry={true}
            /> */}
            <TextAdvance
              // label={t('email')}
              // placeHolder={'example@gmail.com'}
              placeHolder={t('email')}
              value={user.email}
              keyboardType="email-address"
              onChangeText={e => setUser({ ...user, email: e })}
              isFocus
              showIcon
            />
            <TextAdvance
              // label={t('password')}
              // placeHolder={t('limitPassword')}
              placeHolder={t('password')}
              value={user.password}
              onChangeText={e => setUser({ ...user, password: e })}
              isFocus
              secureTextEntry
              showIcon
              style={{ marginTop: verticalScale(25) }}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: scale(20),
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <CheckBox
                checked={user.remember_me}
                setChecked={() => setUser({ ...user, remember_me: !user.remember_me })}
                label={t('rememberMe')}
              />
              <Button onPress={() => console.log('forget')}>
                <Text style={mode === 'light' ? lightMode.text : darkMode.text}>
                  {t('forgotPassword')}
                </Text>
              </Button>
            </View>

            <ButtonFill
              text={t('login').toString()}
              onPress={() => onLogin()}
              style={{ marginTop: verticalScale(45), marginBottom: verticalScale(20) }}
            />
          </View>
          <View style={styles.languageBlock}>
            <View style={styles.language}>
              <Button style={{ marginRight: scale(30) }} onPress={() => onChangeLanguage('vi')}>
                <Text style={{ color: colors.primary }}>Tiếng Việt</Text>
              </Button>
              <Button onPress={() => onChangeLanguage('en')}>
                <Text style={{ color: colors.primary }}>English</Text>
              </Button>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: verticalScale(20),
            }}
          >
            <Text style={mode === 'light' ? lightMode.text : darkMode.text}>
              {t('dontHaveAccount')}
            </Text>
            <Button onPress={() => navigate('Register')}>
              <Text style={{ color: colors.primary }}> {t('register')}</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
      <AlertModal
        visible={show}
        type="warning"
        buttonText={t('activate')}
        title={t('accountInactivate')}
        text={t('activateMessage')}
        onOkPress={() => navigate('Activate')}
        setVisible={setShow}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 4,
  },
  footer: {
    flex: 6,
    paddingHorizontal: moderateScale(20),
    justifyContent: 'space-between',
  },
  languageBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  language: {
    flexDirection: 'row',
  },
});

export default LoginScreen;
