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

  const salvar = async () => {
    await updateUser(user.id, nome);
    Alert.alert('Salvo', `Nome atualizado para: ${nome}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edição de Usuário</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} />
        <Button title="Salvar" onPress={salvar} color='#42988f' />
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
});
