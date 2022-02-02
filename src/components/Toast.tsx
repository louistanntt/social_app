import React, { memo, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import colors from '../config/colors';
import { moderateScale, scale, verticalScale } from '../utilities/functions/scaling';

export type ToastProps = {
  message: string;
  type?: 'error' | 'warning' | 'success';
  duration?: number;
  onHide?: () => void;
};

const Toast = (props: ToastProps) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const { message, type = 'success', duration = 500, onHide } = props;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: duration,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: duration,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide;
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.toast,
          {
            opacity,
            backgroundColor: colors[type],
            transform: [
              {
                translateY: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [scale(-20), 0],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={{ color: 'white' }}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: verticalScale(10),
    left: 0,
    right: 0,
  },
  toast: {
    margin: moderateScale(10),
    marginBottom: moderateScale(20),
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: verticalScale(3),
    },
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(5),
    elevation: moderateScale(6),
  },
});

export default memo(Toast);
