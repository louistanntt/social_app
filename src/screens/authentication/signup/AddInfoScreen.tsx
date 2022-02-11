import React, { useState } from 'react';
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
import { RegisterProps } from '../../../shared/type';
import { registerAPI } from '../../../api/authentication/registerAPI';
import { scale, verticalScale } from '../../../utilities/functions/scaling';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../utilities/functions/common';
import { darkMode, lightMode } from './styles';
import { toast } from '../../../utilities/functions/toast';

interface AddInfoScreenProps {}

const AddInfoScreen: React.FC<AddInfoScreenProps> = props => {
  const { statusBarHeight } = useDeviceInfo(true);
  const mode = useAppSelector(state => state.settings.mode);
  // const navigation = useNavigation();
  const { t, i18n } = useTranslation('general');

  const [check, setCheck] = useState<boolean>(false);

  const [user, setUser] = useState<AddInfoScreenProps>({
    email: '',
    password: '',
    confirm: '',
  });

  const onRegister = async () => {
    if (user.password !== user.confirm) {
      toast(t('passwordNotMatch'), 'error');
    } else {
      // const res = await registerAPI(user);
      // console.log(res);
      if (!user.email.includes('@gmail.com')) {
        toast(t('invalidEmail'), 'error');
      } else {
        navigate('Activate', { item: user });
      }
    }
  };

  return (
    <KeyboardView>
      <View style={{ flex: 1, width: '100%' }}>
        <View style={styles.header}>
          <Text style={{ fontSize: 40, color: colors.primary }}>social</Text>
        </View>
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
              value={user.confirm}
              placeHolder={t('reEnterPassword')}
              isFocus
              style={{ marginTop: verticalScale(30) }}
              showIcon
              onChangeText={e => {
                setUser({
                  ...user,
                  confirm: e,
                });
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
              {/* <Text style={mode === 'light' ? lightMode.text : darkMode.text}>
                  {t('forgotPassword')}
                </Text> */}
              {/* </Button> */}
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
              text={t('next').toString()}
              onPress={() => onRegister()}
              style={{ marginTop: verticalScale(45), marginBottom: verticalScale(20) }}
              disabled={!user.email || !user.password || !user.confirm}
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
      </View>
    </KeyboardView>
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

export default AddInfoScreen;
