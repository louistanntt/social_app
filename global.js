import { useNavigation } from '@react-navigation/native';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from './src/utilities/functionsHelper';
// import i18n from './src/constants/ui/i18n';
import {
  AlertModal,
  BottomSheet,
  Button,
  ButtonFill,
  CheckBox,
  KeyboardView,
  TextField,
  // TextFieldLabel,
  Toast,
  ToastCustom,
} from './src/components';
// import { convertDate, formatMoney } from './src/helpers/functionHelpers';
import { AntIcon, EnIcon, FeIcon, FaIcon, IoIcon, MdIcon, MaIcon } from './src/components/Icons';
// import { PopConfirm } from './src/helpers/PopConfirm';
// import theme from './src/helpers/themes.js';
// import selectors from './src/selectors';
// import * as socket from './src/socket';

// const { width, height } = Dimensions.get('window');

// global.WIDTH_NEED_CHANGE = 600;
// global.MAX_WIDTH = width > 500 ? 500 : width;
// global.IOS = Platform.OS === 'ios';
// global.IPAD = width > WIDTH_NEED_CHANGE;

global.React = React;
// RN Library
global.StyleSheet = StyleSheet;
global.ScrollView = ScrollView;
global.Loading = ActivityIndicator;
global.Platform = Platform;
global.FlatList = FlatList;

// Hook
global.useState = useState;
global.useEffect = useEffect;
global.useRef = useRef;
global.useCallback = useCallback;

global.useSelector = useAppSelector;
global.useDispatch = useAppDispatch;
global.useNavigation = useNavigation;
global.memo = memo;

// config
// global.theme = theme;
// global.i18n = i18n;

// redux
// global.slt = selectors;
// global.act = actions;
// global.socket = socket;

// component
global.AlertModal = AlertModal;
global.BottomSheet = BottomSheet;
global.Button = Button;
global.ButtonFill = ButtonFill;
global.CheckBox = CheckBox;
global.KeyboardView = KeyboardView;
global.TextField = TextField;
// global.TextFieldLabel = TextFieldLabel;
global.Toast = Toast;
global.ToastCustom = ToastCustom;
// function helper
// global.money = formatMoney;
// global.dateFormat = convertDate;

// device dimension
// global.width = width;
// global.height = height;

// global.$primary = theme.colors.primary;
// global.$blue = theme.colors.blue;
// global.$red = theme.colors.red;
// global.$purple = theme.colors.purple;
// global.$orange = theme.colors.orange;
// global.$gray = theme.colors.gray;
// global.$gray2 = theme.colors.gray2;
// global.$gray3 = theme.colors.gray3;
// global.$secondary = theme.colors.secondary;

// icon
global.AntIcon = AntIcon;
global.MdIcon = MdIcon;
global.FeIcon = FeIcon;
global.FaIcon = FaIcon;
global.EnIcon = EnIcon;
global.IoIcon = IoIcon;
global.MaIcon = MaIcon;
