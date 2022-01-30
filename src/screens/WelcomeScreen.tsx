import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, ToastCustom } from '../components';

interface WelcomeScreenProps {}

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
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
    >
      {messages.map(mess => (
        <ToastCustom
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

const styles = StyleSheet.create({});

export default WelcomeScreen;
