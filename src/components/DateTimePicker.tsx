import React, { memo, Dispatch, SetStateAction } from 'react';
import { View, StyleSheet } from 'react-native';
import moment, { Moment } from 'moment';
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';
import { moderateScale } from '../utilities/functions/scaling';
import { Button, BottomSheet } from '.';

type DateTimePickerProps = {
  date: Moment;
  setDate: Dispatch<SetStateAction<Moment>>;
  show: boolean;
  setShow: (e: any) => void;
};

const DateTimePicker = (props: DateTimePickerProps) => {
  const { date, setDate, show, setShow } = props;
  const { windowHeight, windowWidth } = useDeviceInfo();

  if (!show) {
    return <View />;
  }

  return (
    <View
      style={[
        styles.container,
        {
          width: windowWidth,
          height: windowHeight,
        },
      ]}
    >
      <Button
        onPress={() => {
          setShow(false);
        }}
        style={[
          styles.overlay,
          {
            width: windowWidth + 40,
            height: windowHeight + 40,
          },
        ]}
      />
      <BottomSheet
        style={{ zIndex: 1000 }}
        show={show}
        setShow={setShow}
        scrollable={false}
        stack={1.5}
      >
        {}
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100000,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    zIndex: 1,
    position: 'absolute',
    left: -20,
    top: -20,
  },
  wrapper: {
    backgroundColor: 'white',
    borderRadius: 10,
    zIndex: 2,
    width: '100%',
    height: '100%',
    flex: 1,
    position: 'absolute',
    bottom: 0,
  },
});

export default memo(DateTimePicker);
