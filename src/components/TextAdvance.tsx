import React, { useEffect, useMemo, useState, memo } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInputProps,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  KeyboardTypeOptions,
} from 'react-native';
import colors from '../config/colors';
import { useAppSelector } from '../utilities/functions/common';
import { moderateScale, scale, verticalScale } from '../utilities/functions/scaling';
import { IoIcon } from './Icons';

interface TextAdvanceProps extends TextInputProps {
  value: string;
  defaultValue?: string;
  style?: StyleProp<TextStyle>;
  label?: string;
  secureTextEntry?: any;

  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  iconStyle?: any;
  textErrorStyle?: StyleProp<TextStyle>;
  textError?: string;
  showIcon?: boolean;
  numeric?: boolean;
  focusColor?: string;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  renderRightIcon?: () => JSX.Element | null | undefined;
  renderLeftIcon?: () => JSX.Element | null | undefined;
  placeHolder?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'characters' | 'words' | 'sentences';
  editable?: boolean;
  multiline?: boolean;
  isFocus?: boolean;
}

const TextAdvance = (props: TextAdvanceProps) => {
  const {
    value,
    defaultValue,
    style,
    label,
    secureTextEntry,
    showIcon,
    numeric,
    onChangeText = (value: string) => {},
    renderLeftIcon,
    renderRightIcon,
    multiline,
    editable = true,
    placeHolder,
    keyboardType,
    autoCapitalize,
    isFocus,
  } = props;

  const mode = useAppSelector(state => state.settings.mode);
  const [text, setText] = useState<string>('');
  const [onFocusState, setOnFocusState] = useState<boolean>(false);
  const [textEntry, setTextEntry] = useState<boolean>(secureTextEntry ? true : false);

  useEffect(() => {
    if (value) {
      if (numeric) {
        setText(formatCurrency(value));
      } else {
        setText(value);
      }
    } else {
      setText('');
    }
  }, [value]);

  const formatCurrency = (num: string) => {
    const values = num.toString().replace(/\D/g, '');
    return values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const reConvertCurrency = (x: string) => {
    let s;
    s = x.split('.');
    s = s.join('');
    return s;
  };

  const onChange = (text: string) => {
    if (numeric) {
      setText(formatCurrency(text));
      onChangeText(reConvertCurrency(text));
    } else {
      setText(text);
      onChangeText(text);
    }
  };

  const onChangeTextEntry = () => {
    setTextEntry(!textEntry);
  };

  const _renderRightIcon = () => {
    if (showIcon) {
      if (renderRightIcon) {
        return renderRightIcon();
      }
      if (text.length > 0) {
        if (secureTextEntry) {
          return (
            <TouchableOpacity onPress={onChangeTextEntry}>
              <IoIcon name={textEntry ? 'eye-outline' : 'eye-off-outline'} size={20} />
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity onPress={() => onChange('')}>
              <IoIcon name={'close-outline'} size={20} />
            </TouchableOpacity>
          );
        }
      } else {
        return null;
      }
    }
    return null;
  };

  const colorFocus = useMemo(() => {
    if (isFocus && onFocusState) {
      return {
        borderBottomColor: colors.primary,
        borderTopColor: colors.primary,
        borderLeftColor: colors.primary,
        borderRightColor: colors.primary,
        borderWidth: 1,
      };
    } else {
      const color = mode === 'light' ? colors.lightGray : colors.darkGray;
      return {
        borderBottomColor: color,
        borderTopColor: color,
        borderLeftColor: color,
        borderRightColor: color,
        borderWidth: 1,
      };
    }
  }, [onFocusState]);

  return (
    <>
      <View
        style={[
          styles.container,
          style,
          colorFocus,
          {
            backgroundColor: editable
              ? mode === 'light'
                ? colors.lightSecondary
                : colors.darkSecondary
              : 'transparent',
          },
        ]}
      >
        <View style={[styles.textInput]}>
          {renderLeftIcon?.()}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {label ? (
              <Text style={[styles.label, { color: editable ? colors.gray : colors.white }]}>
                {label}
              </Text>
            ) : null}
            <TextInput
              {...props}
              value={value}
              defaultValue={defaultValue}
              style={{ color: editable ? colors.gray : colors.white }}
              placeholderTextColor={colors.gray}
              placeholder={placeHolder}
              onChangeText={onChangeText}
              secureTextEntry={textEntry}
              keyboardType={keyboardType}
              autoCapitalize={autoCapitalize}
              editable={editable}
              onFocus={() => isFocus && setOnFocusState(true)}
              onBlur={() => isFocus && setOnFocusState(false)}
              multiline={multiline}
            />
          </View>
          {_renderRightIcon()}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 55,
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(5),
  },
  textInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 0,
    flex: 1,
  },
  label: {
    fontSize: 14,
    position: 'absolute',
    top: -28,
    backgroundColor: 'white',
    paddingHorizontal: 4,
    marginLeft: -8,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    width: 20,
    height: 20,
  },
  textError: {
    color: 'red',
    fontSize: 14,
    marginTop: 10,
  },
});

export default memo(TextAdvance);
