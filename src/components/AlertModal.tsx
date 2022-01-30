import React, { memo, Ref, useEffect, useState } from 'react';
import { Modal, StyleSheet, View, Text } from 'react-native';
import { ButtonFill } from '.';
import colors from '../config/colors';
import { moderateScale, scale, verticalScale } from '../utilities/functions/scaling';
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';
import { AntIcon, IoIcon } from './Icons';

type AlertModalProps = {
  visible: boolean;
  title: string;
  text: string;
  setVisible?: any;
  buttonText?: string;
  type?: 'error' | 'danger' | 'info' | 'warning' | 'success';
  children?: any;
  modalRef?: any;
};

const AlertModal = (props: AlertModalProps) => {
  const {
    visible,
    setVisible,
    children,
    buttonText = 'OK',
    title,
    text,
    type = 'success',
    modalRef,
  } = props;
  const { windowWidth } = useDeviceInfo();

  const [show, setShow] = useState<boolean>(false);

  const onShow = () => {
    setShow(true);
  };

  const onHide = () => {
    setShow(false);
  };

  useEffect(() => {
    visible ? onShow() : onHide();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      statusBarTranslucent
      onRequestClose={() => setVisible(false)}
      animationType={'fade'}
      ref={modalRef}
    >
      <View style={styles.container} onTouchEnd={() => setVisible(false)}>
        <View style={styles.centeredView}>
          <View
            style={[styles.icon, { right: windowWidth / 2 - 70, backgroundColor: colors[type] }]}
          >
            {type === 'warning' || type === 'info' ? (
              <IoIcon name="information-circle" size={40} color={colors.white} />
            ) : type === 'danger' || type === 'error' ? (
              <IoIcon name="close-circle" size={40} color={colors.white} />
            ) : (
              <IoIcon name="checkmark-done-circle" size={40} color={colors.white} />
            )}
          </View>
          <View style={styles.content}>
            <View style={{ marginTop: moderateScale(40) }}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.text}>{text}</Text>
            </View>
            <ButtonFill text={buttonText} onPress={() => setVisible(false)} />
            {children}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  centeredView: {
    width: scale(300),
    height: verticalScale(250),
    backgroundColor: 'white',
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    top: -25,
    height: scale(70),
    width: scale(70),
    borderRadius: scale(35),
    borderColor: 'white',
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: verticalScale(10),
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: scale(20),
    fontWeight: '400',
    textAlign: 'center',
  },
  text: { fontSize: scale(14), textAlign: 'center', marginTop: 10 },
});

export default memo(AlertModal);
