// src/components/Dashboard.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

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
      <h2>Bem-vindo à tela principal</h2>
      <button onClick={handleListarAlunos}>Listar alunos</button>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Dashboard;