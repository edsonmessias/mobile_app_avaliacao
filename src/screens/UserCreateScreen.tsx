import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { createUser } from '../services/userService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserCreate'>;

export default function UserCreateScreen() {
  const [nome, setNome] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirm, setConfirm] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const salvar = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Informe um nome válido.');
      return;
    }
    if(senha !== senhaConfirm){
      Alert.alert('As senhas não conferem!')
      return;
    }
    const novo = await createUser(nome,login,senha);
    Alert.alert('Usuário criado', `ID: ${novo.id}`);
    //navigation.replace('UserEdit', { user: novo }); // opcional: ir direto para edição
    navigation.replace('UserList');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome do usuário" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Login" value={login} onChangeText={setLogin} style={styles.input} />
      <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} style={styles.input} />
      <TextInput placeholder="Confirmação de Senha" value={senhaConfirm} onChangeText={setConfirm} style={styles.input} />
      <Button title="Cadastrar" onPress={salvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8
  }
});
