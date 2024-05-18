import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const Alunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAluno, setEditingAluno] = useState(null);
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();


  const fetchAlunos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/usuario?ocupacao=aluno');
      setAlunos(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const updateAluno = async (email, nome, senha) => {
    try {
      await axios.patch(`http://localhost:8000/usuario/${email}`, { nome, senha });
      fetchAlunos();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleUpdate = (aluno) => {
    setEditingAluno(aluno);
    setNome(aluno.nome);
    setSenha('');
  };

  const handleSave = async () => {
    if (editingAluno) {
      await updateAluno(editingAluno.email, nome, senha);
      setEditingAluno(null);
      setNome('');
      setSenha('');
      fetchAlunos();
    }
  };

  const createAluno = () => {
    navigate('/');
  };


  const handleDelete = async (email) => {
    try {
      await axios.delete(`http://localhost:8000/usuario/${email}`);
      fetchAlunos();
    } catch (error) {
      console.error('Erro ao deletar o aluno', error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <button onClick={createAluno}>Criar aluno</button>
      <ul>
        {alunos.map(aluno => (
          <li key={aluno.email}>
            {aluno.nome} - {aluno.email}
            <button onClick={() => handleUpdate(aluno)}>Editar</button>
            <button onClick={() => handleDelete(aluno.email)}>Deletar</button>
          </li>
        ))}
      </ul>
      {editingAluno && (
        <div>
          <h3>Editar Aluno</h3>
          <form onSubmit={handleSave}>
            <div>
              <label>Nome:</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div>
              <label>Senha:</label>
              <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            </div>
            <button type="button" onClick={handleSave}>Salvar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Alunos;