// src/components/Dashboard.js
import { useNavigate } from 'react-router-dom';
import api from'../../api';

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await api.post('/auth/logout');
      if (response.status === 200) {
        navigate('/auth');
      }
    } catch (error) {
      alert('Erro ao deslogar');
    }
  };

  return (
    <div>
      <h2>Bem-vindo à tela principal</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Dashboard;