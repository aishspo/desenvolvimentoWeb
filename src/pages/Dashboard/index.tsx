// src/components/Dashboard.js
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ListaPastas from '../../components/ListarPastas';
import Cabecalho from '../../components/Cabecalho';

function Dashboard() {
  const navigate = useNavigate();
  const email = useParams();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/auth/logout', {}, { withCredentials: true });
      if (response.status === 200) {
        navigate('/auth');
      }
    } catch (error) {
      console.error('Erro ao deslogar', error);
      alert('Erro ao deslogar');
    }
  };

  const handleListarAlunos = () => {
    navigate("/listarAlunos");
  };
  return (
    <div>
      <Cabecalho />
      <h2>Bem-vindo à tela principal</h2>
      <button onClick={handleListarAlunos}>Listar alunos</button>
      <button onClick={handleLogout}>Sair</button>
      <ListaPastas email={email} />
    </div>
  );
}

export default Dashboard;