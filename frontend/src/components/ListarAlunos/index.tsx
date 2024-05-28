
// EXISTE OUTRA VERSÃOOOOOOOOOOOOOOOOOOOOO

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface Aluno {
  nome: string;
  email: string;
  senha: string;
}

const Alunos = () => {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [nome, setNome] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/usuario?ocupacao=aluno');
      setAlunos(response.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError((err as AxiosError).message);
      } else {
        setError(String(err));
      }
    }
  };

  const createAluno = async () => {
    try {
      await axios.post('http://localhost:8000/usuario', { nome, email, senha });
      fetchAlunos();
      setNome("");
      setEmail("");
      setSenha("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError((err as AxiosError).message);
      } else {
        setError(String(err));
      }
    }
  };

  const updateAluno = (email: string) => {
    navigate(`/editar-aluno/${email}`);
  };

  const deleteAluno = async (email: string) => {
    try {
      await axios.delete(`http://localhost:8000/usuario/${email}`);
      setAlunos(alunos.filter(aluno => aluno.email !== email));
    } catch (error) {
      console.error("Erro ao deletar o aluno", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)} />
      <button onClick={createAluno}>Create</button>
      {alunos.map((aluno) => (
        <div key={aluno.email}>
          <p>{aluno.nome}</p>
          <p>{aluno.email}</p>
          <button onClick={() => updateAluno(aluno.email)}>Update</button>
          <button onClick={() => deleteAluno(aluno.email)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Alunos;
