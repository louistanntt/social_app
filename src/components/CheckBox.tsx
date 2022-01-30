import React, { Dispatch, memo, SetStateAction } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  Insets,
  ActivityIndicator,
} from 'react-native';
import colors from '../config/colors';
import { AntIcon } from './Icons';

type CheckBoxProps = {
  style?: StyleProp<ViewStyle>;
  label?: string;
  checked: boolean;
  setChecked: () => void;
  labelStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  rightLabel?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  hitSlop?: Insets;
};

const CheckBox = (props: CheckBoxProps) => {
  const {
    style,
    label,
    checked,
    setChecked,
    labelStyle,
    loading,
    rightLabel,
    buttonStyle,
    hitSlop,
  } = props;
  return (
    <TouchableOpacity
      style={[
        buttonStyle,
        { justifyContent: 'center', alignItems: 'center', backgroundColor: 'yellow' },
      ]}
      onPress={setChecked}
      hitSlop={hitSlop}
      activeOpacity={0.6}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <View style={[style]}>
          {loading ? (
            <ActivityIndicator color={colors.gray} style={{ transform: [{ scale: 0.7 }] }} />
          ) : (
            <View style={[styles.checkbox, checked && styles.checked]}>
              <AntIcon name="check" size={14} color="white" />
            </View>
          )}
        </View>
        <Text style={[{ marginLeft: 5, color: colors.textGray }, labelStyle]}>{label}</Text>
      </View>
      {rightLabel && rightLabel}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  checked: {
    backgroundColor: colors.primary,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(CheckBox);
