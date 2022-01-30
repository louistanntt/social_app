import React, { memo, useState } from 'react';
import { TextInput, StyleSheet, KeyboardTypeOptions, StyleProp, TextStyle } from 'react-native';
import { scale, moderateScale, verticalScale } from '../utilities/functions/scaling';
import colors from '../config/colors';

type TextFieldType = {
  value: string;
  defaultValue?: string;
  style?: StyleProp<TextStyle>;
  placeHolder?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: any;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'characters' | 'words' | 'sentences';
  editable?: boolean;
  multiline?: boolean;
  isFocus?: boolean;
};

const TextField = (props: TextFieldType) => {
  const {
    value,
    defaultValue,
    style,
    placeHolder,
    onChangeText,
    secureTextEntry,
    keyboardType,
    autoCapitalize,
    editable = true,
    multiline,
    isFocus,
  } = props;

  const [onFocusState, setOnFocusState] = useState<boolean>(false);

  return (
    <TextInput
      value={value}
      defaultValue={defaultValue}
      style={[
        styles.container,
        style,
        {
          borderColor: onFocusState ? colors.primary : colors.lightGray,
          borderWidth: 1,
          backgroundColor: editable ? colors.secondary : 'transparent',
          color: editable ? colors.gray : colors.white,
        },
      ]}
      placeholderTextColor={colors.gray}
      placeholder={placeHolder}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      editable={editable}
      onFocus={() => isFocus && setOnFocusState(true)}
      onBlur={() => isFocus && setOnFocusState(false)}
      multiline={multiline}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    borderRadius: moderateScale(5),
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(14),
  },
});

export default memo(TextField);
