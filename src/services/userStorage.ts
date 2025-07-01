import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './userService';

const USERS_KEY = 'usuarios';

export const getStoredUsers = async (): Promise<User[]> => {
    const json = await AsyncStorage.getItem(USERS_KEY);
    return json ? JSON.parse(json) : [];
};

export const saveUsers = async (users: User[]): Promise<void> => {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const addUser = async (user: User): Promise<void> => {
    const users = await getStoredUsers();
    users.push(user);
    await saveUsers(users);
};

export const updateStoredUser = async (updatedUser: User): Promise<void> => {
    const users = await getStoredUsers();
    const newList = users.map(user => user.id === updatedUser.id ? updatedUser : user);
    await saveUsers(newList);
};


export const validateLogin = async (username: string, password: string): Promise<User | null> => {
    const users = await getStoredUsers();
    return users.find(u => u.username === username && u.password === password) || null;
};
