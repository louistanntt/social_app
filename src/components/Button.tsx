import React, { memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';

type ButtonProps = {
  onPress: (e: GestureResponderEvent) => void;
  children?: any;
  style?: StyleProp<ViewStyle>;
  disable?: boolean;
};

const Button = (props: ButtonProps) => {
  const { onPress, children, style, disable } = props;
  return (
    <TouchableOpacity disabled={disable} style={[style]} onPress={onPress} activeOpacity={0.6}>
      {children}
    </TouchableOpacity>
  );
};

export default memo(Button);
