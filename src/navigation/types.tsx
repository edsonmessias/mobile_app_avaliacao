export type RootStackParamList = {
  Login: undefined;
  UserList: undefined;
  UserEdit: { user: { id: string; nome: string; username: string; password: string; } };
  UserCreate: undefined;
};
