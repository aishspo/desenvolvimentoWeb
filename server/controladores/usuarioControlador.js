/* eslint-disable @typescript-eslint/no-var-requires */
// Importações de bibliotecas e módulos
const { servicoUsuario } = require("../servicos/servicoUsuario");
const yup = require('yup');

const schemaProfessor = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().required(),
  disciplina: yup.string().required(),
});

const schemaAluno = yup.object().shape({
  nome: yup.string().required(),
  email: yup.string().email().required(),
  senha: yup.string().required(),
});

module.exports = { schemaProfessor, schemaAluno };

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

  if (!nome || !email || !senha || !ocupacao) {
    console.warn('Campos obrigatórios faltando na solicitação');
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  console.log(`Tentando cadastrar usuário: Nome=${nome}, Email=${email}, Ocupação=${ocupacao}`);

  try {
    if (ocupacao === "aluno") {
      console.log('Ocupação: aluno. Chamando insereAluno.');
      // Inserir aluno
      await servicoUsuario.insereAluno(nome, email, senha);
      console.log('Aluno inserido com sucesso');
    } else if (ocupacao === "professor") {
      console.log('Ocupação: professor. Chamando insereProfessor.');
      // Inserir professor
      await servicoUsuario.insereProfessor(nome, email, senha, disciplina);
      console.log('Professor inserido com sucesso');
    } else {
      console.warn('Ocupação inválida fornecida');
      return res.status(400).json({ error: "Ocupação inválida" });
    }
    console.log('Usuário cadastrado com sucesso');
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    if (
      error === "Email já cadastrado para aluno" ||
      error === "Email já cadastrado para professor"
    ) {
      console.warn(`Erro de validação: ${error}`);
      return res.status(422).json({ error: error });
    } else {
      console.error(`Erro ao cadastrar usuário: ${error.message}`);
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
        error: "Pelo menos um campo (nome ou senha) deve ser fornecido.",
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

module.exports = {
  getUsuarios,
  postUsuario,
  patchAluno,
  deleteAluno,
};
