import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  setUser: (user: unknown) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error state before new request

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        {
          email,
          senha,
        },
        { withCredentials: true }
      );

      const userType = response.data.user.type;
      if (userType === 'aluno') {
        navigate('/aluno-dashboard');
      } else if (userType === 'professor') {
        navigate('/professor-dashboard')
      } else {
        throw new Error("Tipo de usuário desconhecido")
      }
      setUser(response.data.user);
      alert(response.data.message);
    } catch (error: any) {
      setError(error.response?.data?.message || "Erro desconhecido");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Senha:
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
