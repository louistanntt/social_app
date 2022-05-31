import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import useDeviceInfo from '../../../utilities/hooks/useDeviceInfo';
import {
  TextField,
  ButtonFill,
  Button,
  CheckBox,
  TextAdvance,
  KeyboardView,
} from '../../../components';
import colors from '../../../config/colors';
import { useNavigation } from '@react-navigation/native';
import { goBack, navigate } from '../../../service/navigationService';
import { LoginProps, RegisterProps } from '../../../shared/type';
import { requestCodeAPI, registerAPI } from '../../../api/authentication';
import { scale, verticalScale } from '../../../utilities/functions/scaling';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../utilities/functions/common';
import { darkMode, lightMode } from './styles';
import { toast } from '../../../utilities/functions/toast';
import { setUserRegister } from '../../../redux/slices/userSlice';

interface RegisterScreenProps {
  route: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ route }) => {
  const { statusBarHeight } = useDeviceInfo(true);
  const userParams = route.params?.item;
  const from = route.params?.from;
  const mode = useAppSelector(state => state.settings.mode);
  const dispatch = useAppDispatch();
  // const navigation = useNavigation();
  const { t } = useTranslation(['general', 'common', 'error']);

  const [check, setCheck] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Omit<LoginProps, 'remember_me'>>({
    email: '',
    password: '',
  });

  const [confirm, setConfirm] = useState<string>('');

  useEffect(() => {
    if (userParams) {
      setUser({
        ...user,
        email: userParams.email,
      });
    }
  }, [userParams]);

  const onRegister = async () => {
    if (user.password !== confirm) {
      toast(t('passwordNotMatch', { ns: 'error' }), 'error');
    } else {
      if (!user.email.includes('@gmail.com')) {
        toast(t('invalidEmail', { ns: 'error' }), 'error');
      } else {
        // dispatch(setUserRegister(user));
        navigate('AddInfo', user);
      }
    }
  };

  const onForgotPassword = async () => {
    // if (!user.email.includes('@gmail.com')) {
    //   return toast(t('invalidEmail', { ns: 'error' }), 'error');
    // }
    try {
      setLoading(true);
      const res = await requestCodeAPI({ email: user.email });
      setLoading(false);
      if (res.data.success && res.data.statusCode === 200) {
        navigate('Activate', { email: user.email, from: 'forgot' });
      } else {
        toast(t('invalidEmail', { ns: 'error' }), 'error');
      }
    } catch (error) {
      setLoading(false);
      toast(t('invalidEmail', { ns: 'error' }), 'error');
    }
  };

  const _renderRegister = () => {
    return (
      <View style={styles.footer}>
        <View>
          <TextAdvance
            value={user.email}
            placeHolder={t('email')}
            keyboardType="email-address"
            isFocus
            showIcon
            onChangeText={e => {
              setUser({
                ...user,
                email: e,
              });
            }}
          />
          <TextAdvance
            value={user.password}
            placeHolder={t('password')}
            isFocus
            showIcon
            style={{ marginTop: verticalScale(30) }}
            onChangeText={e => {
              setUser({
                ...user,
                password: e,
              });
            }}
            secureTextEntry={true}
          />
          <TextAdvance
            value={confirm}
            placeHolder={t('reEnterPassword')}
            isFocus
            style={{ marginTop: verticalScale(30) }}
            showIcon
            onChangeText={e => {
              setConfirm(e);
            }}
            secureTextEntry={true}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: scale(20),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <CheckBox checked={check} setChecked={() => setCheck(!check)} />
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Text style={styles.text}>I agree to the</Text>
              <Text style={styles.textPrimary}> Term of Service</Text>
              <Text style={styles.text}> and</Text>
              <Text style={styles.textPrimary}> Privacy Policy</Text>
            </View>
          </View>

          <ButtonFill
            text={t('next', { ns: 'common' }).toString()}
            onPress={() => onRegister()}
            style={{ marginTop: verticalScale(45), marginBottom: verticalScale(20) }}
            disabled={!user.email || !user.password || !confirm}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: verticalScale(20),
          }}
        >
          <Text style={mode === 'light' ? lightMode.text : darkMode.text}>
            {t('alreadyHaveAccount')}
          </Text>
          <Button onPress={() => goBack()}>
            <Text style={{ color: colors.primary }}> {t('login')}</Text>
          </Button>
        </View>
      </View>
    );
  };

  const _renderForgotPassword = () => {
    return (
      <View style={styles.footer}>
        <View>
          <TextAdvance
            value={user.email}
            placeHolder={t('email')}
            keyboardType="email-address"
            isFocus
            showIcon
            onChangeText={e => {
              setUser({
                ...user,
                email: e,
              });
            }}
          />
          <ButtonFill
            text={t('submit', { ns: 'common' }).toString()}
            onPress={() => onForgotPassword()}
            style={{ marginTop: verticalScale(45), marginBottom: verticalScale(20) }}
            disabled={!user.email}
            loading={loading}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginBottom: verticalScale(20),
          }}
        >
          <Button onPress={() => goBack()}>
            <Text style={{ color: colors.primary, textAlign: 'center' }}>
              {t('backTo')} {t('login')}
            </Text>
          </Button>
        </View>
      </View>
    );
  };

  return (
    // <KeyboardView>
    <View style={{ flex: 1, width: '100%' }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 40, color: colors.primary }}>social</Text>
      </View>
      {from === 'forgot' ? _renderForgotPassword() : _renderRegister()}
    </View>
    // </KeyboardView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 6,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  text: {
    color: colors.textGray,
  },
  textPrimary: {
    color: colors.primary,
    fontWeight: '700',
  },
  signUpBtn: {},
});

export default RegisterScreen;
