import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BottomSheet, Button, Toast, DatePicker, Modalize } from '../components';
import FloatingButton from '../components/FloatingButton';
import { AntIcon } from '../components/Icons';
import colors from '../config/colors'
import useDeviceInfo from '../utilities/hooks/useDeviceInfo';

interface TestingScreenProps {}

const TestingScreen: React.FC<TestingScreenProps> = () => {
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<Moment>(moment());
  return (
    <View
      style={styles.container}
      // onTouchEnd={() => {
      //   if (show) {
      //     setShow(false);
      //   }
      // }}
    >
      {/* <Button title="Open Bottom Sheet" onPress={() => setShow(!show)} /> */}
      {/* <BottomSheet
        show={show}
        setShow={setShow}
        onOpen={() => console.log('opening')}
        onClose={() => {
          // setShow(false);
          console.log('closing');
        }}
      >
        <Text>This is Bottom Sheet</Text>
      </BottomSheet> */}
      <DatePicker date={date} setDate={setDate} show={show} setShow={setShow} />
    </View>
  );
};

const TestToast = () => {
  const [messages, setMessages] = useState<Array<any>>([]);
  const getRandomMessage = () => {
    const number = Math.trunc(Math.random() * 10000);
    return 'Random message ' + number;
  };
  return (
    <View
      //   style={{
      //     position: 'absolute',
      //     top: 45,
      //     left: 0,
      //     right: 0,
      //   }}
      style={styles.container}
    >
      {messages.map(mess => (
        <Toast
          key={mess}
          message={mess}
          onHide={() => {
            setMessages(() => messages.filter(currentMessage => currentMessage !== mess));
          }}
        />
      ))}

      <Button
        onPress={() => {
          const message = getRandomMessage();
          setMessages([...messages, message]);
        }}
      >
        <Text>Test</Text>
      </Button>
    </View>
  );
};

const TestDatePicker = () => {
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<Moment>(moment());
  return (
    <View style={styles.container}>
      <Button title="Open Bottom Sheet" onPress={() => setShow(!show)} />

      <DatePicker date={date} setDate={setDate} show={show} setShow={setShow} />
    </View>
  );
};

const TestBottomSheet = () => {
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<Moment>(moment());
  return (
    <View style={styles.container}>
      <Button title="Open Bottom Sheet" onPress={() => setShow(!show)} />
      <BottomSheet
        show={show}
        setShow={setShow}
        onOpen={() => console.log('opening')}
        onClose={() => {
          setShow(false);
          console.log('closing');
        }}
      >
        <Text>This is Bottom Sheet</Text>
      </BottomSheet>
    </View>
  );
};

const TestModal = () => {
  const [show, setShow] = useState(false);
  console.log('wtf2')
  return( <View style={styles.container}>
      <Button title="Open Modal" onPress={() => setShow(!show)} />
      <Modalize show={show}>
        <View><Text>Hello</Text></View>
      </Modalize>
    </View>
  )
};


const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  button: {
    height: 80,
    width: 80,
    borderRadius: 80/2,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default TestingScreen;
