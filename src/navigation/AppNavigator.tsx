import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';

import LoginScreen from '../screens/LoginScreen';
import UserEditScreen from '../screens/UserEditScreen';
import UserListScreen from '../screens/UserListScreen';
import UserRegisterScreen from '../screens/UserRegisterScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const limparLogin = async () => {
            await AsyncStorage.removeItem('token'); // remove token salvo
            setIsLogged(false); // força login ao iniciar
        };
        limparLogin();
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="UserList" component={UserListScreen} />
                <Stack.Screen name="UserEdit" component={UserEditScreen} />
                <Stack.Screen name="UserCreate" component={UserRegisterScreen} />
            </Stack.Navigator>

        </NavigationContainer>
    );
}
