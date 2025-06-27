import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { login } from '../services/auth';

type RootStackParamList = {
  Login: undefined;
  UserList: undefined;
  UserEdit: { user: { id: string; nome: string } };
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const success = await login(username, password);
    if (success) {
      navigation.replace('UserList');
    } else {
      Alert.alert('Erro', 'Usuário ou senha inválidos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>
      <TextInput style={styles.input} placeholder="Usuário" onChangeText={setUsername} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <Button title="Entrar" onPress={handleLogin} color="#42988f"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f0f0f5'
  },
  title: {
    fontSize: 36,
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#d65c56',
    fontFamily:'LexendDecaRegular'
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

