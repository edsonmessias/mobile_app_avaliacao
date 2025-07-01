export interface User {
  id: string;
  nome: string;
  login: string;
  senha: string;
}

let users: User[] = [
  { id: '1', nome: 'Felipe Negri', login: 'felipe.negri', senha: '123' },
  { id: '2', nome: 'Felipe Ariel', login: 'felipe.ariel', senha: '123' },
  { id: '3', nome: 'Edson Messias', login: 'edson.messias', senha: '123' },
  { id: '4', nome: 'Pedro Augusto', login: 'pedro.augusto', senha: '123' },
  { id: '5', nome: 'Kenny Almeida', login: 'kenny.almeida', senha: '123' }
];

export const createUser = async (nome: string, login: string, senha: string): Promise<User> => {
  const novo: User = {
    id: String(Date.now()),
    nome,
    login,
    senha
  };
  users.push(novo);
  return novo;
};


export const getUsers = async (): Promise<User[]> => {
  return users;
};

export const updateUser = async (id: string, nome: string, login: string, senha: string): Promise<void> => {
  users = users.map((user) => (user.id === id ? { ...user, nome,login,senha } : user));
};
