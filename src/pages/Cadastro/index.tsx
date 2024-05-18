import React, { useState } from 'react';
import axios from 'axios';
import IUsuario from '../../types/IUsuario';
import { useNavigate } from 'react-router-dom';


const Cadastro: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [ocupacao, setOcupacao] = useState("");
  const [disciplina, setDisciplina] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  };

  const handleOcupacaoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOcupacao(e.target.value);
  };

  const handleDisciplinaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisciplina(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const dadosUsuario: IUsuario = {
        nome: name,
        email: email,
        senha: senha,
        ocupacao: ocupacao,
        disciplina: disciplina, // Inclua disciplina apenas se o usuário for um professor
      };

      await axios.post<IUsuario>("http://localhost:8000/usuario", dadosUsuario);
      alert("Usuário cadastrado com sucesso!");
    } catch (error) {
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <div>
      <h1>Cadastro de Usuários</h1>
      <div>
        <label>Nome:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>Senha:</label>
        <input type="password" value={senha} onChange={handleSenhaChange} />
      </div>
      <div>
        <label>Ocupacao:</label>
        <input type="text" value={ocupacao} onChange={handleOcupacaoChange} />
      </div>
      <div>
        <label>Disciplina:</label>
        <input type="text" value={disciplina} onChange={handleDisciplinaChange} />
      </div>
      <button onClick={handleSubmit}>Cadastrar</button>
      <button onClick={handleBack}>Voltar</button>
    </div>)
};

export default Cadastro;
