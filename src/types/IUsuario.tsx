export default interface IUsuario {
    nome: string;
    email: string;
    senha: string;
    ocupacao: string;
    disciplina?: string; // O campo disciplina é opcional para usuários do tipo professor
  }
  