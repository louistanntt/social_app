import React, { memo, useState } from 'react';
import { TextInput, StyleSheet, KeyboardTypeOptions, StyleProp, TextStyle } from 'react-native';
import { scale, moderateScale, verticalScale } from '../utilities/functions/scaling';
import { useAppSelector } from '../utilities/functions/common';
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
  const mode = useAppSelector(state => state.settings.mode);

  return (
    <TextInput
      value={value}
      defaultValue={defaultValue}
      style={[
        styles.container,
        style,
        {
          borderColor: onFocusState
            ? colors.primary
            : mode === 'light'
            ? colors.lightGray
            : colors.darkGray,
          borderWidth: 1,
          backgroundColor: editable
            ? mode === 'light'
              ? colors.lightSecondary
              : colors.darkSecondary
            : 'transparent',
          color: editable ? colors.gray : colors.white,
        },
      ]}
      placeholderTextColor={mode === 'light' ? colors.textGray : colors.white}
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
