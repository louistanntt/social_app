import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BottomSheet, Button, Toast, DatePicker } from '../components';

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
      <Button title="Open Bottom Sheet" onPress={() => setShow(!show)} />
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

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
});

export default TestingScreen;
