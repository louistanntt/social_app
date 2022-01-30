import React, { useEffect } from 'react';
import { ScrollView, Dimensions, Keyboard, Platform } from 'react-native';
import { scale, verticalScale, moderateScale } from '../utilities/functions/scaling';
import Animated, { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';

type KeyboardViewProps = {
  children?: any;
  isHeader?: boolean;
};

const KeyboardView = (props: KeyboardViewProps) => {
  const { children, isHeader } = props;
  const { windowWidth, windowHeight } = useDeviceInfo();
  const scaleAnim = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: -scaleAnim.value }],
    };
  });
  useEffect(() => {
    const onKeyboardShow = (e: any) => {
      scaleAnim.value = withSpring(e.endCoordinates.height / 3);
    };
    const onKeyboardHide = () => {
      scaleAnim.value = withSpring(0);
    };
    let eventShow =
      Platform.OS === 'ios'
        ? Keyboard.addListener('keyboardWillShow', onKeyboardShow)
        : Keyboard.addListener('keyboardDidShow', onKeyboardShow);
    let eventHide =
      Platform.OS === 'ios'
        ? Keyboard.addListener('keyboardWillHide', onKeyboardHide)
        : Keyboard.addListener('keyboardDidHide', onKeyboardHide);
    return () => {
      Keyboard.removeSubscription(eventShow);
      Keyboard.removeSubscription(eventHide);
    };
  }, []);
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{
        width: windowWidth,
        paddingHorizontal: scale(10),
        height: isHeader ? windowHeight - verticalScale(80) : windowHeight,
      }}
      scrollEnabled={false}
    >
      <Animated.View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          animatedStyles,
        ]}
      >
        {children}
      </Animated.View>
    </ScrollView>
  );
};
export default KeyboardView;
