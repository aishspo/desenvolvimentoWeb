import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://localhost:8000/login/logout');
            alert(response.data.message);
            navigate(-1);
        } catch (error) {
            alert('Erro ao tentar sair');
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default LogoutButton;
