import 'react-native-reanimated';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import React, { memo, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';
import colors from '../config/colors';
import { Button } from '.';

type ContextType = {
  startTop: number;
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
  enableSwipe?: boolean;
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
    enableSwipe = true,
    line = true,
  } = props;
  const { windowWidth, windowHeight, statusBarHeight } = useDeviceInfo(true);
  
  const top = useSharedValue(topOffSet ? topOffSet : windowHeight);
  const overlayTop = useSharedValue(0)

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
    // const top = withSpring(
    //   top.value, 
    //   SPRING_CONFIG
    // )

    // return { top }
    return { top: withSpring(top.value, SPRING_CONFIG) };
  });

  const overlayAnimatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(
      overlayTop.value,
      [0, overlayTop.value],
      [0, 1],
    );

    return {
      opacity
    };
  });

  const onOpenSheet = async () => {
    if (onOpen) {
      await onOpen();
    }
    top.value = withSpring(topOffSet ? topOffSet : windowHeight / stack, SPRING_CONFIG);
    // overlayTop.value = withSpring(0)
    overlayTop.value = withSpring(1)
  };

  const onCloseSheet = () => {
    if (onClose) {
      onClose();
    }
    top.value = withSpring(windowHeight, SPRING_CONFIG);
    // overlayTop.value = withSpring(windowHeight)
    overlayTop.value = withSpring(0)
    if (setShow) {
      return setShow(false);
    }
  };

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart(event, context) {
      context.startTop = top.value;
      console.log('start')
    },
    onActive(event, context) {
      console.log('wtf')
      if(!enableSwipe && event.translationY < 0){
        top.value = context.startTop
      } else {
        top.value = context.startTop + event.translationY;
      }
    },
    onEnd(event, context) {
      if(enableSwipe) {
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
        if(!enableSwipe && event.translationY < 0){
          top.value = context.startTop
        } else if(!enableSwipe && topOffSet && top.value > topOffSet) {
          top.value = windowHeight;
          runOnJS(onCloseSheet)();
        } else {
          top.value = windowHeight / stack;
        }
      }
    },
  });

  return (
    <>
      {show && <Animated.View style={[{
        position: 'absolute',
        zIndex: 10,
        elevation: 10,
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        backgroundColor: 'rgba(0,0,0,0.5)',
      }, overlayAnimatedStyles]}>
          <TouchableOpacity style={{flex: 1}} onPress={() => onCloseSheet()} />
      </Animated.View>}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          onLayout={({nativeEvent}) => {
          // const modalHeight = nativeEvent.layout.height
          // setTest(windowHeight - modalHeight)
        }}
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
              zIndex: 100
            },
            animatedStyle,
            style,
          ]}
        >
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
