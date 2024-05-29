const Aluno = require('../models/Aluno');

exports.createAluno = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    await Aluno.create(nome, email, senha);
    res.status(201).send('Aluno cadastrado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao cadastrar aluno.');
  }
};