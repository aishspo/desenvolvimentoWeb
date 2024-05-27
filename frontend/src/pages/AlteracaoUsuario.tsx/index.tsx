import React, { useState } from 'react';
import axios from 'axios';

const AlteracaoUsuario: React.FC = () => {
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:8000/usuario/${email}`, { nome, senha });
      setMensagem('Usuário atualizado com sucesso');
    } catch (error) {
      setMensagem('Erro ao atualizar usuário');
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <div>
      <h2>Alterar Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <button type="submit">Atualizar Usuário</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
};

export default AlteracaoUsuario;
