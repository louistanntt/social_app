import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '../../components';
import BottomSheet from '../../components/BottomSheet';

interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = props => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Button onPress={() => setShow(!show)}>
        <Text>Hi</Text>
      </Button>
      <BottomSheet show={show} setShow={() => setShow} height={500} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
