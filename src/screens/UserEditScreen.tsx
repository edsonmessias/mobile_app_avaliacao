import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { updateStoredUser } from '../services/userStorage';

type UserEditRouteProp = RouteProp<RootStackParamList, 'UserEdit'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserEdit'>;

export default function UserEditScreen() {
  const route = useRoute<UserEditRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { user } = route.params;

  const [nome, setNome] = useState(user.nome);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);

  const salvar = async () => {
    if (!nome || !username || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    await updateStoredUser({
      id: user.id,
      nome,
      username,
      password,
    });

    Alert.alert('Sucesso', 'Usuário atualizado!');
    navigation.goBack(); // retorna à lista
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edição de Usuário</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Salvar" onPress={salvar} color='#42988f' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 24,
    margin: 24,
    backgroundColor: '#f0f0f5',

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
    marginBottom: 16,
    textAlign: 'left',
    color: '#736100',
    fontWeight: '500'
  },
});
