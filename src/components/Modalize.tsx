import React, { forwardRef, ReactNode } from 'react';
import { Modal, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';

type ModalizeProps = {
  show: boolean;
  children: ReactNode;
  height?: number;
  width?: number;
  headerShow?: boolean;
  headerText?: string;
  scrollable?: boolean;
  action?: boolean;
  onAction?: () => void;
  onClose?: () => void;
  onRotateDevice?: boolean;
  onBackEvent?: boolean;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  actionComponent?: ReactNode
};

const Modalize = (props: ModalizeProps, ref: any) => {
  const { windowHeight, windowWidth } = useDeviceInfo();
  const {
    height = windowHeight / 2,
    width = windowWidth / 2,
    headerShow,
    headerText,
    children,
    scrollable = false,
    action = true,
    actionComponent,
    onAction,
    onClose,
    onRotateDevice,
    onBackEvent,
    style,
    headerStyle,
  } = props;
  return <Modal></Modal>;
};

const styles = StyleSheet.create({});

export default forwardRef((props: ModalizeProps, ref: any) => Modalize(props, ref));
