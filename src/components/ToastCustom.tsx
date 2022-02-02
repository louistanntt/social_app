import React from 'react';
import { StyleProp, ViewStyle, View, Text, Platform } from 'react-native';
import { Button } from '.';
import Toast, { ToastConfig } from 'react-native-toast-message';
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';
import { moderateScale, scale, verticalScale } from '../utilities/functions/scaling';
import colors from '../config/colors';

export default function ToastCustom() {
  const toastStyle: StyleProp<ViewStyle> = {
    height: '100%',
    marginHorizontal: scale(15),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(5),
    alignSelf: 'center',
  };

  const { statusBarHeight } = useDeviceInfo();

  const toastConfig: ToastConfig = {
    success: ({ text1, props, ...rest }) => (
      <Button onPress={() => Toast.hide()} style={{ width: '100%' }}>
        <View
          style={[
            toastStyle,
            { backgroundColor: colors.success, justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <Text style={{ zIndex: 3, textAlign: 'center', color: 'white' }}>{text1}</Text>
        </View>
      </Button>
    ),
    error: ({ text1, props, ...rest }) => (
      <Button
        onPress={() => {
          Toast.hide();
          //   dispatch(act.general.setReFetch(true));
        }}
        style={{ width: '100%' }}
      >
        <View
          style={[
            toastStyle,
            { backgroundColor: colors.error, justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <Text style={{ zIndex: 3, textAlign: 'center', color: 'white' }}>{text1}</Text>
        </View>
      </Button>
    ),
    info: ({ text1, props, ...rest }) => (
      <Button onPress={() => Toast.hide()} style={{ width: '100%' }}>
        <View
          style={[
            toastStyle,
            { backgroundColor: colors.info, justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <Text style={{ zIndex: 3, textAlign: 'center', color: 'white' }}>{text1}</Text>
        </View>
      </Button>
    ),
    warning: ({ text1, props, ...rest }) => (
      <Button onPress={() => Toast.hide()} style={{ width: '100%' }}>
        <View
          style={[
            toastStyle,
            { backgroundColor: colors.warning, justifyContent: 'center', alignItems: 'center' },
          ]}
        >
          <Text style={{ zIndex: 3, textAlign: 'center', color: 'white' }}>{text1}</Text>
        </View>
      </Button>
    ),
  };

  return (
    <Toast
      topOffset={
        statusBarHeight > 30 && Platform.OS === 'android'
          ? statusBarHeight - verticalScale(25)
          : statusBarHeight - verticalScale(5)
      }
      config={toastConfig}
    />
  );
}
