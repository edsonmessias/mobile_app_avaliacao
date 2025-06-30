import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { createUser } from '../services/userService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserCreate'>;

export default function UserCreateScreen() {
  const [nome, setNome] = useState('');
  const navigation = useNavigation<NavigationProp>();

  const salvar = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Informe um nome válido.');
      return;
    }
    const novo = await createUser(nome);
    Alert.alert('Usuário criado', `ID: ${novo.id}`);
    //navigation.replace('UserEdit', { user: novo }); // opcional: ir direto para edição
    navigation.replace('UserList');
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Nome do usuário" value={nome} onChangeText={setNome} style={styles.input} />
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
