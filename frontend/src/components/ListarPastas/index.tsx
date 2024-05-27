import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import imagemPasta from "./assets/pasta-icon.png";
import imagemCriarPasta from "./assets/criar-pasta-icon.png"
import Modal from "../Modal/index"; // Certifique-se de ajustar o caminho conforme necessário
import styled from "styled-components";


// Estilização específica do botão
const BotaoCriarPasta = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #76012f;

  img {
    margin-right: 0.5rem;
  }
`;

// Definição dos tipos de dados
interface Pasta {
  id: string;
  nome: string;
}

const ListaPastas: React.FC = () => {
  const [pastas, setPastas] = useState<Pasta[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [novaPastaNome, setNovaPastaNome] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { id } = useParams<{ id: int }>();

  useEffect(() => {
    const fetchPastas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/aluno-dashboard/pastas`);
        setPastas(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPastas();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await axios.post(`http://localhost:8000/aluno-dashboard/pastas`, { nome: novaPastaNome }, { withCredentials: true });
      const response = await axios.get(`http://localhost:8000/aluno-dashboard/pastas`, { withCredentials: true });
      setPastas(response.data);
      setNovaPastaNome('');
      setIsModalOpen(false);
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

      <BotaoCriarPasta onClick={() => setIsModalOpen(true)}>
        <img src={imagemCriarPasta} alt="Ícone de Pasta" /> Criar Nova Pasta
      </BotaoCriarPasta>

      {isModalOpen && (
        <Modal title="Criar Nova Pasta" onClose={() => setIsModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={novaPastaNome}
              onChange={(e) => setNovaPastaNome(e.target.value)}
              placeholder="Nome da nova pasta"
              required
            />
            <button type="submit">Criar Pasta</button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ListaPastas;
