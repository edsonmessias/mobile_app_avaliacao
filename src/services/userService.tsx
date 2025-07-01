export interface User {
  id: string;
  nome: string;
  username: string;
  password: string;
}


/*let users: User[] = [
  { id: '1', nome: 'Felipe Negri' },
  { id: '2', nome: 'Felipe Ariel' },
  { id: '3', nome: 'Edson Messias' },
  { id: '4', nome: 'Pedro Augusto' },
  { id: '5', nome: 'Kenny Almeida' }
];

export const createUser = async (nome: string): Promise<User> => {
  const novo: User = {
    id: String(Date.now()),
    nome
  };
  users.push(novo);
  return novo;
};


export const getUsers = async (): Promise<User[]> => {
  return users;
};

export const updateUser = async (id: string, nome: string): Promise<void> => {
  users = users.map((user) => (user.id === id ? { ...user, nome } : user));
};*/
