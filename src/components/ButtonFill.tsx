import React from 'react';
import { memo } from 'react';
import {
  Button,
  TouchableNativeFeedback,
  Text,
  ActivityIndicator,
  View,
  StyleProp,
  TextStyle,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import { scale, moderateScale, verticalScale } from '../utilities/functions/scaling';
import colors from '../config/colors';

type ButtonFillProps = {
  text?: string;
  style?: StyleProp<TextStyle>;
  onPress: (e: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
};

const ButtonFill = (props: ButtonFillProps) => {
  const { text, style, onPress, loading, disabled } = props;

  return (
    <TouchableNativeFeedback disabled={disabled} onPress={onPress}>
      <View
        style={[
          styles.container,
          style,
          (disabled || loading) && { backgroundColor: colors.textGray },
        ]}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} size={'large'} />
        ) : (
          <Text style={styles.text}>{text}</Text>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(12),
    height: verticalScale(45),
    borderRadius: moderateScale(5),
    width: '100%',
    backgroundColor: colors.primary,
  },
  text: {
    color: 'white',
    fontSize: scale(14),
    fontWeight: 'bold',
  },
});
export default memo(ButtonFill);
