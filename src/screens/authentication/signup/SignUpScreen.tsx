import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import useDeviceInfo from '../../../utilities/hooks/useDeviceInfo';
import { TextField, ButtonFill, Header, CheckBox } from '../../../components';
import colors from '../../../config/colors';
import { useNavigation } from '@react-navigation/native';
import { navigate } from '../../../service/navigationService';
import { SignUpProps } from '../../../shared/type';
import { signupAPI } from '../../../api/authentication/signupAPI';
import { AntIcon } from '../../../components/Icons';

interface SignUpScreenProps {}

const SignUpScreen: React.FC<SignUpScreenProps> = props => {
  const { windowHeight, windowWidth, isTablet, statusBarHeight, isLandscape, hasNotch } =
    useDeviceInfo(true);
  // const navigation = useNavigation();

  const [user, setUser] = useState<SignUpProps>({
    email: '',
    password: '',
    // confirm: '',
    phone: '2028873',
    first_name: 'tai',
    last_name: 'tan nguyen',
  });

  const onSignUp = async () => {
    const res = await signupAPI(user);
    console.log(res);
    navigate('Activate', user);
  };

  return (
    <View style={[styles.container, { paddingTop: statusBarHeight }]}>
      {/* <Header leftComponent={<AntIcon name="left" />} leftContainerStyle={{ backgroundColor: 'red' }} /> */}
      <View style={styles.header}>
        <Text style={{ fontSize: 40 }}>Logo</Text>
      </View>
      <View style={styles.footer}>
        <View>
          <TextField
            value={user.email}
            placeHolder="Email"
            isFocus
            onChangeText={e => {
              setUser({
                ...user,
                email: e,
              });
            }}
          />
          <TextField
            value={user.password}
            placeHolder="Password"
            style={{ marginTop: 30 }}
            isFocus
            onChangeText={e => {
              setUser({
                ...user,
                password: e,
              });
            }}
            secureTextEntry={true}
          />
          {/* <TextField
            value={user.confirm}
            isFocus
            placeHolder="Re-enter password"
            style={{ marginTop: 30 }}
            onChangeText={e => {
              setUser({
                ...user,
                confirm: e,
              });
            }}
            secureTextEntry={true}
          /> */}

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={styles.text}>I agree to the</Text>
            <Text style={styles.textPrimary}> Term of Service</Text>
            <Text style={styles.text}> and</Text>
            <Text style={styles.textPrimary}> Privacy Policy</Text>
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <ButtonFill text="Sign up" onPress={() => onSignUp()} style={{ marginTop: 50 }} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 6,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  text: {
    color: colors.textGray,
  },
  textPrimary: {
    color: colors.primary,
    fontWeight: '700',
  },
  signUpBtn: {},
});

export default SignUpScreen;
