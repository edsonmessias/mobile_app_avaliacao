import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getUsers, User } from '../services/userService';

export default function UserListScreen() {
  const navigation = useNavigation<NavigationProp<any>>()
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };
    fetchUsers();
  }, []);

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f0f0f5',

  },
  title: {
    fontSize: 24,
    fontWeight:'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'left',
  },
});