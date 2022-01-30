import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../../config/colors';
import { moderateScale, verticalScale, scale } from '../../../utilities/functions/scaling';
import useDeviceInfo from '../../../utilities/hooks/useDeviceInfo';
import { Button, ButtonFill } from '../../../components';
import { IoIcon } from '../../../components/Icons';

interface ActivateScreenProps {
  route: any;
  navigation: any;
}

const ActivateScreen: React.FC<ActivateScreenProps> = props => {
  const { route, navigation } = props;
  const { statusBarHeight, windowWidth, windowHeight } = useDeviceInfo(true);

  // let minute = 1000 * 60;

  // setInterval(() => {
  //   minute--;
  //   if (minute <= 0) {
  //     // lam gi thi lam
  //   }
  // }, 1000);

  const [OTP, setOTP] = useState<Array<string>>([]);

  console.log(OTP);

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
                styles.numericKey,
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
                <Text style={{ fontSize: 18 }}>Empty</Text>
              ) : item.action === 'delete' ? (
                <IoIcon name="backspace-outline" size={34} />
              ) : (
                <Text style={{ fontSize: 24 }}>{item.label}</Text>
              )}
            </Button>
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <View style={styles.pinContent}>
        <View style={styles.blockText}>
          <Text style={styles.text}>The activate code is sent to </Text>
          <Text style={[styles.text, { color: colors.primary }]}>
            {route.params?.email}@gmail.com
          </Text>
          <Text style={styles.text}>. Please check!</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={styles.text}>Valid in 2 minutes</Text>
        </View>
        <View style={styles.blockPinBox}>
          <View style={styles.pinBox}>
            <Text style={{ fontSize: 20 }}>{OTP[0]}</Text>
          </View>
          <View style={styles.pinBox}>
            <Text style={{ fontSize: 20 }}>{OTP[1]}</Text>
          </View>
          <View style={styles.pinBox}>
            <Text style={{ fontSize: 20 }}>{OTP[2]}</Text>
          </View>
          <View style={styles.pinBox}>
            <Text style={{ fontSize: 20 }}>{OTP[3]}</Text>
          </View>
          <View style={styles.pinBox}>
            <Text style={{ fontSize: 20 }}>{OTP[4]}</Text>
          </View>
          <View style={styles.pinBox}>
            <Text style={{ fontSize: 20 }}>{OTP[5]}</Text>
          </View>
        </View>
        <View style={styles.blockAction}>
          <Button onPress={() => console.log('a')}>
            <Text style={[styles.text, { color: colors.primary }]}>Resend activate code (60s)</Text>
          </Button>
          <ButtonFill
            disabled={OTP.length < 6}
            text="Activate Account"
            onPress={() => console.log('2')}
          />
        </View>
      </View>
      {_renderNumericKeyPad()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pinContent: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomLeftRadius: moderateScale(20),
    borderBottomRightRadius: moderateScale(20),
    paddingVertical: verticalScale(20),
  },
  blockText: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    paddingVertical: verticalScale(5),
    flex: 1,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.gray,
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
  pinBox: {
    backgroundColor: colors.test,
    borderRadius: moderateScale(10),
    width: scale(45),
    height: scale(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockAction: {
    flex: 2,
    width: '100%',
    paddingHorizontal: scale(15),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  numericKey: {
    borderRadius: moderateScale(5),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: moderateScale(5),
  },
});

export default ActivateScreen;
