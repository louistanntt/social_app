import AsyncStorage from '@react-native-async-storage/async-storage';
import configInstance from '../../config/environment';

export const saveToken = async(token: string) => {
    configInstance.accessToken = token;
    await AsyncStorage.setItem('token', configInstance.accessToken)
}

export const removeToken = async () => {
    configInstance.accessToken = '';
    await AsyncStorage.removeItem('token')
}

export const saveRemember = async(value: boolean) => {
    await AsyncStorage.setItem('remember', JSON.stringify(value));
}