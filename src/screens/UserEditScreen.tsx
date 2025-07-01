import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { updateUser } from '../services/userService';

type UserEditRouteProp = RouteProp<RootStackParamList, 'UserEdit'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserEdit'>;

export default function UserEditScreen() {
  const route = useRoute<UserEditRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { user } = route.params;

  const [nome, setNome] = useState(user.nome);
  const [login, setLogin] = useState(user.login);
  const [senha, setSenha] = useState(user.senha);

  const salvar = async () => {
    await updateUser(user.id, nome, login, senha);
    Alert.alert('Salvo', `O usuário atualizado foi: ${login}`);
    navigation.goBack();
  };

  const voltar = () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edição de Usuário</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} value={login} onChangeText={setLogin} />
        <TextInput style={styles.input} value={senha} onChangeText={setSenha} />
        <Button title="Salvar" onPress={salvar} color='#42988f' />
    <View style={styles.button}>
      <Button title="Voltar" onPress={voltar} color='#42988f' />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    padding: 24,
    margin:24,
    backgroundColor: '#f0f0f5',

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
  button: {
    paddingTop: 10
  }
});
