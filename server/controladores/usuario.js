// responsável por receber os dados da requisição, validar esses dados e chamar o serviço para inserção no banco de dados

/* eslint-disable @typescript-eslint/no-var-requires */
const { servicoUsuario } = require("../servicos/usuario");

const getUsuarios = async (req, res) => {
  const { ocupacao } = req.query;

  try {
    let usuarios;

    if (ocupacao === "aluno") {
      // Buscar todos os alunos
      usuarios = await servicoUsuario.getAlunos();
    } else if (ocupacao === "professor") {
      // Buscar todos os professores
      usuarios = await servicoUsuario.getProfessores();
    } else {
      return res.status(400).json({ error: "Ocupação inválida" });
    }

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const postUsuario = async (req, res) => {
  const { nome, email, senha, ocupacao, disciplina } = req.body;

  if (!nome || !email || !senha || !ocupacao) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    if (ocupacao === "aluno") {
      // Inserir aluno
      await servicoUsuario.insereAluno(nome, email, senha);
    } else if (ocupacao === "professor") {
      // Inserir professor
      await servicoUsuario.insereProfessor(nome, email, senha, disciplina);
    } else {
      return res.status(400).json({ error: "Ocupação inválida" });
    }
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    if (
      error === "Email já cadastrado para aluno" ||
      error === "Email já cadastrado para professor"
    ) {
      return res.status(422).json({ error: error });
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
      return res
        .status(400)
        .json({
          error: "Pelo menos um campo (nome ou senha) deve ser fornecido.",
        });
    }

    await servicoUsuario.atualizaAluno(email, nome, senha);
    res.status(200).json({ message: "Aluno atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const deleteAluno = async (req, res) => {
  const email = req.params.email;

  try {
    await deleteAluno(email);
    res.status(200).json({ message: "Aluno deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    res.status(500).json({ error: "Erro ao deletar aluno" });
  }
};

const getPastasAluno = async (req, res) => {
  const email = req.params.email;

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
  // getUsuario,
  postUsuario,
  deleteAluno,
  patchAluno,
  getPastasAluno,
};
