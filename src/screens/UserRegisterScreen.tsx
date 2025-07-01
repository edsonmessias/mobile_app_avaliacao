import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { User } from '../services/userService';
import { addUser } from '../services/userStorage';

type RootStackParamList = {
  UserList: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UserList'>;

export default function UserRegisterScreen() {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [nome, setNome] = useState('');
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');

    const cadastrar = async () => {
        if (!nome || !username || !senha || !confirmaSenha) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }
        if (senha !== confirmaSenha) {
            Alert.alert('Erro', 'Senhas não coincidem');
            return;
        }

        const novo: User = {
            id: Date.now().toString(),
            nome,
            username,
            password: senha
        };
        await addUser(novo);
        Alert.alert('Sucesso', 'Usuário cadastrado!');
        //navigation.goBack();
        navigation.navigate('UserList');
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
            <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
            <TextInput placeholder="Senha" value={senha} onChangeText={setSenha} secureTextEntry style={styles.input} />
            <TextInput placeholder="Confirmar senha" value={confirmaSenha} onChangeText={setConfirmaSenha} secureTextEntry style={styles.input} />
            <Button title="Cadastrar" onPress={cadastrar} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16, flex: 1, justifyContent: 'center' },
    input: { borderWidth: 1, padding: 12, marginBottom: 12, borderRadius: 8 }
});
