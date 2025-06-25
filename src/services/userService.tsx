export interface User {
  id: string;
  nome: string;
}

let users: User[] = [
  { id: '1', nome: 'João' },
  { id: '2', nome: 'Maria' },
  { id: '3', nome: 'Edson' },
  { id: '4', nome: 'Pedro' }
];

export const getUsers = async (): Promise<User[]> => {
  return users;
};

export const updateUser = async (id: string, nome: string): Promise<void> => {
  users = users.map((user) => (user.id === id ? { ...user, nome } : user));
};
