import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { logout } from '../services/auth';
import { User } from '../services/userService';
import { getStoredUsers } from '../services/userStorage';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserList'>;

export default function UserListScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadUsers();
    }
  }, [isFocused]);

  const loadUsers = async () => {
    const data = await getStoredUsers();
    setUsers(data);
  };

  const handleLogout = async () => {
    //await AsyncStorage.removeItem('token');
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários cadastrados</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('UserEdit', { user: item })}>
            <Text style={styles.input}>{item.nome}</Text>
            <Text style={styles.tinyInput}>{item.username}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Novo usuário" onPress={() => navigation.navigate('UserCreate')} />
      <Text style={styles.space}></Text>
      <Button title="Sair" onPress={handleLogout} color="#d65c56" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    margin: 24,
    backgroundColor: '#f0f0f5'

  },
  space: {
    padding: 10,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#42988f',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    textAlign: 'left',
    color: '#736100',
    fontWeight: '500'
  },
  tinyInput: {
    fontSize: 13,
    color: '#736500',
    paddingVertical: 2,
    paddingHorizontal: 20,    
    marginBottom: 6,
    textAlign: 'left',
  }
});