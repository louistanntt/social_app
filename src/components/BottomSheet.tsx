import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Modal, StyleProp, ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useDerivedValue,
  runOnJS,
  useAnimatedStyle,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';
import { scale, verticalScale, moderateScale } from '../utilities/functions/scaling';
import colors from '../config/colors';
import { StyleSheet } from 'react-native';

type BottomSheetProps = {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  children?: any;
  height?: number;
};

const BottomSheet = (props: BottomSheetProps) => {
  const { children, show, setShow, height } = props;
  const [visible, setVisible] = useState(false);
  const showAnim = useSharedValue(0);
  const onShow = () => {
    showAnim.value = withTiming(0, { duration: 500 });
    setVisible(true);
  };
  const onHide = () => {
    (showAnim.value = withTiming(500)), { duration: 300 };
  };

  const recordResult = (result: number) => {
    if (result == 500) setVisible(false);
    // if (result == 1) setVisible(true);
  };

  useDerivedValue(() => {
    runOnJS(recordResult)(showAnim.value);
  });
  useEffect(() => {
    console.log(show);
    show ? onShow() : onHide();
  }, [show]);
  const modalStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(showAnim.value, [0, 500], ['#00000060', '#00000000']),
  }));
  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: showAnim.value }],
  }));
  return (
    <Modal visible={visible} transparent statusBarTranslucent onRequestClose={() => setShow(false)}>
      <Animated.View style={[modalStyle, styles.container]}>
        <View
          style={styles.close}
          onTouchEnd={() => {
            setShow(false);
          }}
        />
        <Animated.View style={[translateY, styles.content, { height: height }]}>
          {/* <View style={styles.activeBar} /> */}
          {children}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    backgroundColor: colors.white,
    width: '100%',
    minHeight: verticalScale(100),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
    borderColor: colors.textGray,
    borderWidth: moderateScale(2),
    padding: scale(10),
  },
  activeBar: {
    position: 'absolute',
    alignSelf: 'center',
    top: verticalScale(-20),
    width: scale(50),
    height: verticalScale(8),
    backgroundColor: colors.primary,
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
  },
  close: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default BottomSheet;
