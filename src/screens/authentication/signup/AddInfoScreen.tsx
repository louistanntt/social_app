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
  Header,
  DatePicker,
  DateTimePicker,
  BottomSheet,
} from '../../../components';
import colors from '../../../config/colors';
import { useNavigation } from '@react-navigation/native';
import { goBack, navigate } from '../../../service/navigationService';
import { RegisterProps } from '../../../shared/type';
import { registerAPI } from '../../../api/authentication';
import { scale, verticalScale } from '../../../utilities/functions/scaling';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../utilities/functions/common';
import { darkMode, lightMode } from './styles';
import { toast } from '../../../utilities/functions/toast';
import moment, { Moment } from 'moment';
interface AddInfoScreenProps {
  route: any;
  navigation: any;
}

const AddInfoScreen: React.FC<AddInfoScreenProps> = ({ route }) => {
  const from = route.params?.from;
  const userParams = route?.params;
  const { statusBarHeight } = useDeviceInfo(true);
  const mode = useAppSelector(state => state.settings.mode);
  const { t } = useTranslation(['general', 'common', 'error']);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<Moment>(moment());

  const [user, setUser] = useState<RegisterProps>({
    email: '',
    password: '',
    phone: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
  });

  useEffect(() => {
    if (userParams) {
      setUser({
        ...user,
        email: userParams.email,
        password: userParams.password,
      });
    }
  }, [userParams]);

  const onSubmit = async () => {
    console.log(from);
    try {
      setLoading(true);
      // const res = await registerAPI({
      //   email: '',
      //   password: '',
      //   phone: '',
      //   first_name: '',
      //   last_name: '',
      //   date_of_birth: '',
      // });
      navigate('Activate', { email: user.email, from: 'register' });
    } catch (error) {}
  };

  const _renderContent = () => {
    if (from === 'forgot') {
      return (
        <View style={{ justifyContent: 'space-between' }}>
          <TextAdvance
            value={''}
            placeHolder={t('oldPassword')}
            isFocus
            showIcon
            secureTextEntry={true}
            onChangeText={e => {}}
          />
          <TextAdvance
            value={''}
            secureTextEntry={true}
            placeHolder={t('newPassword')}
            isFocus
            showIcon
            style={{ marginTop: verticalScale(20) }}
            onChangeText={e => {
              //
            }}
          />
          <TextAdvance
            value={''}
            secureTextEntry={true}
            placeHolder={t('reEnterPassword')}
            keyboardType="numeric"
            isFocus
            showIcon
            style={{ marginTop: verticalScale(20) }}
            onChangeText={e => {
              //
            }}
          />
        </View>
      );
    }
    return (
      <View style={{ justifyContent: 'space-between' }}>
        <TextAdvance
          value={user.first_name}
          placeHolder={t('firstName')}
          isFocus
          showIcon
          onChangeText={e => {
            setUser({ ...user, first_name: e });
          }}
        />
        <TextAdvance
          value={user.last_name}
          placeHolder={t('lastName')}
          isFocus
          showIcon
          style={{ marginTop: verticalScale(20) }}
          onChangeText={e => {
            setUser({ ...user, last_name: e });
          }}
        />
        <TextAdvance
          value={user.phone}
          placeHolder={t('phone')}
          keyboardType="numeric"
          isFocus
          showIcon
          style={{ marginTop: verticalScale(20) }}
          onChangeText={e => {
            setUser({ ...user, phone: e });
          }}
        />
        <ButtonFill
          onPress={() => setShow(!show)}
          text={`${moment(date).format('YYYY/MM/DD')}`}
          style={{
            marginTop: verticalScale(20),
            backgroundColor: colors.lightSecondary,
            borderWidth: 1,
            borderColor: colors.lightGray,
            alignItems: 'flex-start',
            paddingHorizontal: scale(15),
          }}
          textStyle={{ color: colors.gray, fontWeight: '400', fontSize: 14 }}
        />
      </View>
    );
  };

  return (
    // <KeyboardView>
    <View style={{ flex: 1, width: '100%' }}>
      <View style={{ paddingTop: verticalScale(20), flex: 1 }}>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 40, color: colors.primary }}>social</Text>
        </View>
        <View style={{ flex: 6, paddingHorizontal: 20, justifyContent: 'space-between' }}>
          {_renderContent()}
          <ButtonFill
            text={t('submit', { ns: 'common' }).toString()}
            onPress={() => onSubmit()}
            style={{ marginTop: verticalScale(45), marginBottom: verticalScale(10) }}
            // disabled={!user.email}
            loading={loading}
          />
          <View
            style={{
              justifyContent: 'center',
              marginBottom: verticalScale(20),
            }}
          >
            <Button onPress={() => navigate('Login')}>
              <Text style={{ color: colors.primary, textAlign: 'center' }}>
                {t('backTo')} {t('login')}
              </Text>
            </Button>
          </View>
        </View>
      </View>

      <DateTimePicker date={date} setDate={setDate} show={show} setShow={setShow} />
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

export default AddInfoScreen;
