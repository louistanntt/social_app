import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../config/colors';
import { moderateScale, verticalScale, scale } from '../../../utilities/functions/scaling';
import useDeviceInfo from '../../../utilities/hooks/useDeviceInfo';
import { Button, ButtonFill, Header } from '../../../components';
import { IoIcon, EnIcon } from '../../../components/Icons';
import { useAppSelector } from '../../../utilities/functions/common';
import { darkMode, lightMode } from './styles';
import { useTranslation } from 'react-i18next';
import useInterval from '../../../utilities/hooks/useInterval';
import { requestCodeAPI, validateCodeAPI } from '../../../api/authentication';
import { toast } from '../../../utilities/functions/toast';
import { navigate } from '../../../service/navigationService';

interface ActivateScreenProps {
  route: any;
  navigation: any;
}

const ActivateScreen: React.FC<ActivateScreenProps> = ({ route, navigation }) => {
  const userParams = route.params?.email;
  const from = route.params?.from;
  const { statusBarHeight, windowWidth, windowHeight } = useDeviceInfo(true);
  const mode = useAppSelector(state => state.settings.mode);

  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [count, setCount] = useState<number>(10);
  const delay = 1000;

  useInterval(
    () => {
      if (count === 1) {
        setIsRunning(false);
      }
      setCount(count - 1);
    },
    isRunning ? delay : null,
  );

  const { t } = useTranslation(['general', 'common', 'error']);

  const [OTP, setOTP] = useState<Array<string>>([]);

  const onResendCode = async () => {
    if (userParams) {
      await requestCodeAPI({ email: userParams });
    }
  };

  const onActivate = async () => {
    try {
      const res = await validateCodeAPI({
        email: userParams,
        reset_code: OTP.join(''),
      });
      if (res.data.success) {
        navigate('AddInfo', { from: from });
      }
    } catch (error: any) {
      toast(t('invalidCode', { ns: 'error' }), 'error');
    }
  };

  const _renderNumericKeyPad = () => {
    const numericKeyPad = [
      { label: '1', action: null },
      { label: '2', action: null },
      { label: '3', action: null },
      { label: '4', action: null },
      { label: '5', action: null },
      { label: '6', action: null },
      { label: '7', action: null },
      { label: '8', action: null },
      { label: '9', action: null },
      { label: '', action: 'empty' },
      { label: '0', action: null },
      { label: '', action: 'delete' },
    ];

    return (
      <View style={styles.pinPad}>
        {numericKeyPad.map((item, index) => {
          return (
            <Button
              key={index.toString()}
              style={[
                mode === 'light' ? lightMode.numericKey : darkMode.numericKey,
                {
                  width: (windowWidth - scale(10) * 5) / 3,
                  height: (windowHeight - verticalScale(20) * 6) / 12,
                },
                item.action === 'empty' && { backgroundColor: 'none' },
              ]}
              onPress={() => {
                if (item.action === 'empty') {
                  setOTP([]);
                } else if (item.action === 'delete') {
                  OTP.pop();
                  setOTP([...OTP]);
                } else {
                  if (OTP.length === 6) return;
                  OTP.push(item.label);
                  setOTP([...OTP]);
                }
              }}
            >
              {item.action === 'empty' ? (
                <Text
                  style={[
                    {
                      fontSize: 18,
                    },
                    mode === 'light' ? lightMode.textNumber : darkMode.textNumber,
                  ]}
                >
                  {t('empty', { ns: 'common' })}
                </Text>
              ) : item.action === 'delete' ? (
                <IoIcon
                  name="backspace-outline"
                  size={34}
                  color={mode === 'dark' ? colors.lightGray : colors.gray}
                />
              ) : (
                <Text
                  style={[
                    {
                      fontSize: 18,
                    },
                    mode === 'light' ? lightMode.textNumber : darkMode.textNumber,
                  ]}
                >
                  {item.label}
                </Text>
              )}
            </Button>
          );
        })}
      </View>
    );
  };

  console.log(from);

  return (
    <View style={[mode === 'light' ? lightMode.container : darkMode.container]}>
      {/* <View style={{ flex: 1, paddingTop: statusBarHeight }}> */}
      <View style={mode === 'light' ? lightMode.pinContent : darkMode.pinContent}>
        <Header />
        <View style={styles.blockText}>
          <Text style={mode === 'light' ? lightMode.text : darkMode.text}>
            {t('sentCodeMessage')}{' '}
          </Text>
          <Text
            style={[mode === 'light' ? lightMode.text : darkMode.text, { color: colors.primary }]}
          >
            {userParams}.{' '}
          </Text>
          <Text style={mode === 'light' ? lightMode.text : darkMode.text}>{t('pleaseCheck')}!</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={mode === 'light' ? lightMode.text : darkMode.text}>
            {t('validIn')} 2 {t('minutes').toLowerCase()}
          </Text>
        </View>
        <View style={styles.blockPinBox}>
          <View style={mode === 'light' ? lightMode.pinBox : darkMode.pinBox}>
            <Text
              style={[
                { fontSize: 20 },
                mode === 'light' ? lightMode.textNumber : darkMode.textNumber,
              ]}
            >
              {OTP[0]}
            </Text>
          </View>
          <View style={mode === 'light' ? lightMode.pinBox : darkMode.pinBox}>
            <Text
              style={[
                { fontSize: 20 },
                mode === 'light' ? lightMode.textNumber : darkMode.textNumber,
              ]}
            >
              {OTP[1]}
            </Text>
          </View>
          <View style={mode === 'light' ? lightMode.pinBox : darkMode.pinBox}>
            <Text
              style={[
                { fontSize: 20 },
                mode === 'light' ? lightMode.textNumber : darkMode.textNumber,
              ]}
            >
              {OTP[2]}
            </Text>
          </View>
          <View style={mode === 'light' ? lightMode.pinBox : darkMode.pinBox}>
            <Text
              style={[
                { fontSize: 20 },
                mode === 'light' ? lightMode.textNumber : darkMode.textNumber,
              ]}
            >
              {OTP[3]}
            </Text>
          </View>
          <View style={mode === 'light' ? lightMode.pinBox : darkMode.pinBox}>
            <Text
              style={[
                { fontSize: 20 },
                mode === 'light' ? lightMode.textNumber : darkMode.textNumber,
              ]}
            >
              {OTP[4]}
            </Text>
          </View>
          <View style={mode === 'light' ? lightMode.pinBox : darkMode.pinBox}>
            <Text
              style={[
                { fontSize: 20 },
                mode === 'light' ? lightMode.textNumber : darkMode.textNumber,
              ]}
            >
              {OTP[5]}
            </Text>
          </View>
        </View>
        <View style={styles.blockAction}>
          <Button
            style={{
              borderColor: colors.primary,
              borderWidth: moderateScale(1),
              height: verticalScale(45),
              width: '45%',
              borderRadius: moderateScale(5),
              justifyContent: 'center',
            }}
            disable={isRunning}
            onPress={() => {
              setCount(10);
              setIsRunning(true);
              onResendCode();
            }}
          >
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={[
                  mode === 'light' ? lightMode.text : darkMode.text,
                  { color: colors.primary },
                ]}
              >
                {t('resendCode')}
              </Text>
              {isRunning ? (
                <Text
                  style={[
                    mode === 'light' ? lightMode.text : darkMode.text,
                    { color: colors.primary },
                  ]}
                >
                  ({count}s)
                </Text>
              ) : null}
            </View>
          </Button>
          <ButtonFill
            disabled={OTP.length < 6}
            text={t(`${from === 'forgot' ? 'submit' : 'activate'}`, { ns: 'common' })}
            onPress={() => onActivate()}
            style={{ width: '45%' }}
          />
        </View>
      </View>
      {_renderNumericKeyPad()}
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  blockText: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingVertical: verticalScale(5),
    paddingHorizontal: scale(10),
    flex: 1,
  },
  pinPad: {
    flex: 2,
    flexDirection: 'row',
    paddingVertical: verticalScale(20),
    paddingHorizontal: scale(10),
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  blockPinBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: scale(15),
    flex: 2,
  },
  blockAction: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: scale(15),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(5),
  },
});

export default ActivateScreen;
