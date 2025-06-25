import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { updateUser, User } from '../services/userService';

export default function UserEditScreen() {
  const route = useRoute()
  const navigation = useNavigation<NavigationProp<any>>()
  const user = route.params as User
  const [nome, setNome] = useState(user.nome);

  const salvar = async () => {
    await updateUser(user.id, nome);
    Alert.alert('Salvo', `Nome alterado para: ${nome}`);
    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput value={nome} onChangeText={setNome} />
      <Button title="Salvar" onPress={salvar} />
    </View>
  );
}
