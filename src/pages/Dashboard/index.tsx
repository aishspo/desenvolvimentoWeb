// src/components/Dashboard.js
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

  return (
    <div>
      <h2>Bem-vindo à tela principal</h2>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Dashboard;