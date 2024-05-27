/* eslint-disable @typescript-eslint/no-var-requires */
// controladoresDocumento.js

const { servicosDocumento } = require("../servicos/pasta");

const postDocumento = async (req, res) => {
  const { idPasta } = req.params; // ID da pasta à qual o documento será associado
  const { nome, tipo } = req.body; // Dados do documento

  // Verifica se foram fornecidos nome e tipo do documento
  if (!nome || !tipo) {
    return res.status(400).json({ error: "Nome e tipo do documento são obrigatórios" });
  }

  try {
    // Chama o serviço para salvar o documento
    await servicosDocumento.salvarDocumento(idPasta, nome, tipo);
    res.status(201).json({ message: "Documento salvo com sucesso" });
  } catch (error) {
    console.error("Erro ao salvar documento:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = { postDocumento };
