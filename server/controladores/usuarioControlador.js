/* eslint-disable @typescript-eslint/no-var-requires */
// Importações de bibliotecas e módulos
const { servicoUsuario } = require("../servicos/servicoUsuario");
const yup = require('yup');

// Esquemas de validação usando yup
const schemaAluno = yup.object({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().required(),
});

const schemaProfessor = yup.object({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().required(),
  disciplina: yup.string().required(),
});

// Controladores
const getUsuarios = async (req, res) => {
  const { ocupacao } = req.query;

  try {
    const operacoes = {
      aluno: servicoUsuario.getAlunos,
      professor: servicoUsuario.getProfessores,
    };

    const operacao = operacoes[ocupacao];
    if (!operacao) {
      res.status(400).json({ error: "Ocupação inválida" });
      return;
    }

    const usuarios = await operacao();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const postUsuario = async (req, res) => {
  const { nome, email, senha, ocupacao, disciplina } = req.body;

  try {
    if (ocupacao === "aluno") {
      await schemaAluno.validate({ nome, email, senha });
      await servicoUsuario.insereAluno(nome, email, senha);
    } else if (ocupacao === "professor") {
      await schemaProfessor.validate({ nome, email, senha, disciplina });
      await servicoUsuario.insereProfessor(nome, email, senha, disciplina);
    } else {
      res.status(400).json({ error: "Ocupação inválida" });
      return;
    }

    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: error.errors.join(", ") });
    } else {
      console.error("Erro ao cadastrar usuário:", error);
      res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};

const patchAluno = async (req, res) => {
  const { email } = req.params;
  const { nome, senha } = req.body;

  try {
    if (!nome && !senha) {
      res.status(400).json({
        error: "Pelo menos um campo (nome ou senha) deve ser fornecido."
      });
      return;
    }

    await servicoUsuario.atualizaAluno(email, nome, senha);
    res.status(200).json({ message: "Aluno atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const deleteAluno = async (req, res) => {
  const { email } = req.params;

  try {
    await servicoUsuario.deletarAluno(email);
    res.status(200).json({ message: "Aluno deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    res.status(500).json({ error: "Erro ao deletar aluno" });
  }
};

const getPastasAluno = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Usuário não autenticado" })
  }

  const email = req.session.user.email;

  try {
    const pastas = await servicoUsuario.listarPastasAluno(email);
    res.status(200).json(pastas);
  } catch (error) {
    console.error('Erro ao listar pastas do aluno:', error);
    res.status(500).json({ error: 'Erro ao listar pastas do aluno' });
  }
};

module.exports = {
  getUsuarios,
  postUsuario,
  patchAluno,
  deleteAluno,
  getPastasAluno,
};
