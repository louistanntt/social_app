import React, { useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import useDeviceInfo from '../../../utilities/hooks/useDeviceInfo';
import { TextField, ButtonFill, Button, CheckBox, AlertModal } from '../../../components';
// import { colors, configInstance } from '../../../config';
import useKeyboard from '../../../utilities/hooks/useKeyboard';
import { moderateScale, scale, verticalScale } from '../../../utilities/functions/scaling';
import { toast } from '../../../utilities/functions/toast';
import { navigate } from '../../../service/navigationService';
import { darkMode, lightMode } from './styles';
import { useAppSelector } from '../../../utilities/functions/common';
import { setLanguage } from '../../../redux/slices/settingsSlice';
import { useTranslation } from 'react-i18next';
import { LoginProps } from '../../../shared/type';
import { loginAPI } from '../../../api/authentication/loginAPI';
import configInstance from '../../../config/environment';
import colors from '../../../config/colors';

interface LoginScreenProps {}

const LoginScreen: React.FC<LoginScreenProps> = () => {
  const { windowHeight, windowWidth, isTablet, statusBarHeight, isLandscape, hasNotch } =
    useDeviceInfo(true);
  const mode = useAppSelector(state => state.settings.mode);
  const { keyboardShown } = useKeyboard();
  // const navigation = useNavigation();

  console.log(configInstance);

  const { t, i18n } = useTranslation('general');

  const [user, setUser] = useState<LoginProps>({
    email: '',
    password: '',
    remember_me: false,
  });
  const [show, setShow] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);

  const onLogin = async () => {
    if (!user.email || !user.password) {
      toast('Hi', 'error');
    } else {
      const res = await loginAPI(user);
      console.log(res);
    }
  };

  const onChangeLanguage = (newLanguage: string): void => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   <ButtonFill text="A" onPress={() => setShow(!show)} />

    // </View>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[
        styles.container,
        { paddingTop: statusBarHeight, backgroundColor: mode === 'light' ? '#fff' : '#000' },
      ]}
    >
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={{ fontSize: 40, color: colors.primary }}>social</Text>
        </View>
        <View style={styles.footer}>
          <View>
            <TextField
              value={user.email}
              placeHolder="Email"
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
              placeHolder="Password"
              isFocus
              style={{ marginTop: verticalScale(30) }}
              onChangeText={e => {
                setUser({
                  ...user,
                  password: e,
                });
              }}
              secureTextEntry={true}
            />
            {/* <TextFieldLabel value="ncc" /> */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: scale(20),
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'red',
              }}
            >
              <CheckBox
                checked={remember}
                setChecked={() => {
                  console.log(remember);
                  setRemember(!remember);
                }}
                label="Remember me"
              />
              <Button
                style={{ marginTop: verticalScale(20), backgroundColor: 'blue' }}
                onPress={() => console.log('forget')}
              >
                <Text style={styles.text}>{t('forgotPassword')}</Text>
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
            <Text style={styles.text}>{t('dontHaveAccount')}</Text>
            <Button onPress={() => navigate('SignUp')}>
              <Text style={{ color: colors.primary }}> {t('signUp')}</Text>
            </Button>
          </View>
        </View>
      </ScrollView>
      <AlertModal
        visible={show}
        type="warning"
        buttonText="Activate"
        title={'Account Inactive'}
        text={'Account has not been activated. Please click on the button to continue.'}
        setVisible={setShow}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  text: {
    color: colors.textGray,
  },
  signUpBtn: {},
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
