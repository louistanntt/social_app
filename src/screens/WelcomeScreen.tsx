import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BottomSheet, Button, Toast } from '../components';

interface WelcomeScreenProps {}

const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  return (
    <View style={styles.container}>
      <Text>Welcome Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', flex: 1 },
});

export default WelcomeScreen;
