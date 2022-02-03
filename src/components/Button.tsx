import React, { memo } from 'react';
import { StyleProp, ViewStyle, Text, TextStyle } from 'react-native';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import { verticalScale } from '../utilities/functions/scaling';

type ButtonProps = {
  onPress: (e: GestureResponderEvent) => void;
  children?: any;
  style?: StyleProp<ViewStyle>;
  disable?: boolean;
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
};

const Button = (props: ButtonProps) => {
  const { onPress, children, style, disable, title, titleStyle } = props;
  return (
    <TouchableOpacity
      disabled={disable}
      style={[style, { flexDirection: 'row' }]}
      onPress={onPress}
      activeOpacity={0.6}
    >
      {children}
      {title && <Text style={[titleStyle]}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default memo(Button);
