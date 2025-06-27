//import { NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { getUsers, User } from '../services/userService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserList'>;

export default function UserListScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused(); // detecta se a tela está visível

  useEffect(() => {
    if (isFocused) {
      getUsers().then(setUsers); // recarrega os usuários sempre que a tela volta
    }
  }, [isFocused]);

   const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // limpa o token (se houver)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // volta para tela de login e limpa histórico
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
          </TouchableOpacity>
        )}
      />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color:'#42988f',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'left',
    color:'#736100',
    fontWeight:'500'
  },
});