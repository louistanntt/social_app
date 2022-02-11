import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '../../../components';
import BottomSheet from '../../../components/BottomSheet';
import useDeviceInfo from '../../../utilities/hooks/useDeviceInfo';

interface ExploreScreenProps {}

const ExploreScreen: React.FC<ExploreScreenProps> = props => {
  const { windowHeight, windowWidth, isTablet, statusBarHeight, isLandscape, hasNotch } =
    useDeviceInfo(true);
  const [show, setShow] = useState<boolean>(false);
  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <Button onPress={() => setShow(!show)}>
        <Text>Explore</Text>
      </Button>
      {/* <BottomSheet show={show} setShow={() => setShow} height={500} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExploreScreen;
