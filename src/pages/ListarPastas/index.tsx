import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Importe useParams para extrair o parâmetro da URL

import imagemPasta from  "/src/pages/ListarPastas/assets/pasta-icon.png";

const ListaPastas = () => {
  const [pastas, setPastas] = useState([]);
  const [error, setError] = useState(null);
  const [novaPastaNome, setNovaPastaNome] = useState('');

  // Use useParams para extrair o email da URL
  const { email } = useParams();

  useEffect(() => {
    const fetchPastas = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/usuario/${email}/pastas`
        );
        setPastas(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPastas();
  }, [email]); // Certifique-se de incluir 'email' como dependência para reexecutar o efeito quando o email mudar

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Enviar solicitação POST para criar uma nova pasta
      await axios.post(`http://localhost:8000/pasta/${email}/pastas`, { nome: novaPastaNome });
      // Atualizar a lista de pastas
      const response = await axios.get(`http://localhost:8000/usuario/${email}/pastas`);
      setPastas(response.data);
      // Limpar o campo de entrada
      setNovaPastaNome('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Pastas do Aluno</h2>
      {error && <p>Erro ao carregar as pastas: {error}</p>}
      <ul>
        {pastas.map(pasta => (
          <li key={pasta.id}>
            <img src={imagemPasta} alt="Ícone de Pasta" /> {/* Imagem da pasta */}
            {pasta.nome}
          </li>
        ))}
      </ul>

      {/* Formulário para criar uma nova pasta */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={novaPastaNome}
          onChange={(e) => setNovaPastaNome(e.target.value)}
          placeholder="Nome da nova pasta"
        />
        <button type="submit">Criar Pasta</button>
      </form>
    </div>
  );
};

export default ListaPastas;
