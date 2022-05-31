import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from '../../../components';
import useDeviceInfo from '../../../utilities/hooks/useDeviceInfo';
import { removeToken } from '../../../utilities/functions/tokenStorage';
import { navigate } from '../../../service/navigationService';

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = props => {
  const { windowHeight, windowWidth, isTablet, statusBarHeight, isLandscape, hasNotch } =
    useDeviceInfo(true);

  const onLogOut = async () => {
    await removeToken();
    navigate('Auth');
  };
  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      <Button onPress={() => onLogOut()}>
        <Text>Logout</Text>
      </Button>
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

export default ProfileScreen;
