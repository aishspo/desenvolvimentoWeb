import React, { useState } from "react";
import axios from "axios";
import IUsuario from "../../types/IUsuario";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Formulario,
  Rotulo,
  Input,
  Button,
  ButtonGroup,
  CampoDigitacao,
} from "./styles";

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
    <Container>
      <Formulario>
        <CampoDigitacao>
          <Rotulo>Nome</Rotulo>
          <Input type="text" value={name} onChange={handleNameChange} />
        </CampoDigitacao>
        <CampoDigitacao>
          <Rotulo>Email</Rotulo>
          <Input type="email" value={email} onChange={handleEmailChange} />
        </CampoDigitacao>
        <CampoDigitacao>
          <Rotulo>Senha</Rotulo>
          <Input type="password" value={senha} onChange={handleSenhaChange} />
        </CampoDigitacao>
        <CampoDigitacao>
          <Rotulo>Ocupação</Rotulo>
          <Input type="text" value={ocupacao} onChange={handleOcupacaoChange} />
        </CampoDigitacao>
        <CampoDigitacao>
          <Rotulo>Disciplina</Rotulo>
          <Input
            type="text"
            value={disciplina}
            onChange={handleDisciplinaChange}
          />
        </CampoDigitacao>
        <ButtonGroup>
          <Button onClick={handleSubmit}>Cadastrar</Button>
          <Button onClick={handleBack}>Voltar</Button>
        </ButtonGroup>
      </Formulario>
    </Container>
  );
};

export default Cadastro;
