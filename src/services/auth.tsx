import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './userService';
import { validateLogin } from './userStorage';

export const login = async (username: string, password: string): Promise<User | null> => {
  const user = await validateLogin(username, password);
  if (user) {
    await AsyncStorage.setItem('token', user.id);
    return user;
  }
  return null;
};

export const loginNoUser = async (username: string, password: string): Promise<boolean> => {
  if (username === 'admin' && password === '123') {
    await AsyncStorage.setItem('token', 'fake-token');
    return true;
  }
  return false;
};

export const logout = async (): Promise<void> => {
  await AsyncStorage.removeItem('token');
};

export const isAuthenticated = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem('token');
  return !!token;
};
