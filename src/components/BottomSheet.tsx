import 'react-native-reanimated';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import React, { memo, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';
import colors from '../config/colors';
import { Button } from '.';

type Context = {
  startTop?: number;
};

type BottomSheetProps = {
  show: boolean;
  stack?: number;
  children?: any;
  style?: StyleProp<ViewStyle>;
  topOffSet?: number;
  onOpen?: (e?: any) => void;
  onClose?: (e?: any) => void;
  setShow?: React.Dispatch<SetStateAction<boolean>>;
  scrollable?: boolean;
  line?: boolean;
};

const BottomSheet = (props: BottomSheetProps) => {
  const {
    show,
    children,
    style,
    topOffSet,
    onOpen,
    onClose,
    setShow,
    stack = 2,
    scrollable = true,
    line = true,
  } = props;
  const { windowWidth, windowHeight, statusBarHeight } = useDeviceInfo(true);
  const top = useSharedValue(topOffSet ? topOffSet : windowHeight);
  const SPRING_CONFIG = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  };

  useEffect(() => {
    show ? onOpenSheet() : onCloseSheet();
  }, [show]);

  const animatedStyle = useAnimatedStyle(() => {
    return { top: withSpring(top.value, SPRING_CONFIG) };
  });

  const onOpenSheet = async () => {
    if (onOpen) {
      await onOpen();
    }
    top.value = withSpring(topOffSet ? topOffSet : windowHeight / stack, SPRING_CONFIG);
  };

  const onCloseSheet = () => {
    if (onClose) {
      onClose();
    }
    top.value = withSpring(windowHeight, SPRING_CONFIG);
    if (setShow) {
      return setShow(false);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context: Context) {
      context.startTop = top.value;
    },
    onActive(event, context: Context) {
      top.value = context.startTop + event.translationY;
    },
    onEnd() {
      if (scrollable) {
        if (top.value < windowHeight / 4) {
          return (top.value = statusBarHeight);
        }
        // if (top.value > windowHeight / 2 && top.value < (windowHeight * 3) / 4) {
        //   return (top.value = windowHeight / 1.2);
        // }

        if (top.value > windowHeight / 2 + 200) {
          top.value = windowHeight;
          runOnJS(onCloseSheet)();
        } else {
          return (top.value = windowHeight / stack);
        }
      } else {
        top.value = windowHeight / stack;
      }
    },
  });

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: colors.white,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              padding: 20,
            },
            animatedStyle,
            style,
          ]}
        >
          {/* {show ? (
            <Button
              onPress={() => {
                setShow && setShow(false);
                onCloseSheet();
              }}
              style={[
                styles.overlay,
                {
                  height: windowHeight + 100,
                  width: windowWidth + 100,
                  top: -(windowHeight / 2 + 100),
                  left: -(windowWidth / 2 - 100),
                },
              ]}
            />
          ) : null} */}
          {line ? (
            <View style={styles.wrapperLine}>
              <View style={[styles.line]} />
            </View>
          ) : null}

          {children || <Text>Sheet</Text>}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  wrapperLine: { alignItems: 'center', marginTop: -10 },
  overlay: {
    backgroundColor: 'red',
  },
  line: {
    backgroundColor: colors.lightGray,
    width: 80,
    height: 5,
    borderRadius: 30,
  },
});

export default memo(BottomSheet);
