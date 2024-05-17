// responsável por receber os dados da requisição, validar esses dados e chamar o serviço para inserção no banco de dados
/* eslint-disable @typescript-eslint/no-var-requires */

const { servicoPasta } = require("../servicos/pasta");

// const getPastasPorAluno = async (req, res) => {
//     const { aluno_email } = req.query;

//     try {
//         const pastas = await servicoPasta.getPasta(aluno_email);
//         res.status(200).json(pastas);
//       } catch (error) {
//         console.error('Erro ao buscar pastas:', error);
//         res.status(500).json({ error: 'Erro interno do servidor' });
//       }
// }

const postPasta = async (req, res) => {
  const { email } = req.params; // Obtenha o email do aluno a partir dos parâmetros da URL
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
  const email = req.params.email;

  try {
    const pastas = await servicoPasta.listarPastasAluno(email);
    res.status(200).json(pastas);
  } catch (error) {
    console.error("Erro ao listar pastas do aluno:", error);
    res.status(500).json({ error: "Erro ao listar pastas do aluno" });
  }
};

const getPastaPorId = async (req, res) => {
  const { id, email } = req.params;

  try {
    if (!userId) {
      return res.status(401).send("Usuário não autenticado");
    }
    const userId = req.session.userId;
    const pasta = await servicoPasta.getPastaPorId(id, userId);
    if (!pasta) {
      return res
        .status(404)
        .json({ error: "Pasta não encontrada ou não pertence ao aluno" });
    }
    res.json(pasta);
  } catch (error) {
    console.error("Erro ao obter pasta:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = {
  getPastasAluno,
  postPasta,
  getPastaPorId,
};
