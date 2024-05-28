/* eslint-disable @typescript-eslint/no-var-requires */

const { servicoPasta } = require("../servicos/pasta");
const { servicoUsuario } = require("../servicos/servicoUsuario");


const postPasta = async (req, res) => {
  const { email } = req.session.user.email;
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  try {
    await servicoPasta.criarPasta(email, nome); // Passe o email do aluno para o serviço criarPasta
    res.status(201).json({ message: "Pasta criada com sucesso" });
  } catch (error) {
    console.error("Erro ao criar pasta:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getPastasAluno = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Usuário não autenticado" });
  }

  const email = req.session.user.email;
  console.log("Email do usuário autenticado:", email);

  try {
    const pastas = await servicoUsuario.listarPastasAluno(email);
    console.log("Pastas retornadas pelo serviço:", pastas);
    res.status(200).json(pastas);
  } catch (error) {
    console.error('Erro ao listar pastas do aluno:', error);
    res.status(500).json({ error: 'Erro ao listar pastas do aluno' });
  }
};

module.exports = {
  getPastasAluno,
};


module.exports = {
  getPastasAluno,
  postPasta,
}
