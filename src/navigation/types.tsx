export type RootStackParamList = {
  Login: undefined;
  UserList: undefined;
  UserEdit: { user: { id: string; nome: string, login: string, senha: string } };
  UserCreate: undefined;
};
