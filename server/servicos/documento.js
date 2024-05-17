/* eslint-disable @typescript-eslint/no-var-requires */
// servicosDocumento.js

const db = require("../server.js");

const salvarDocumento = (idPasta, nomeDocumento, tipoDocumento) => {
    return new Promise( (resolve, reject) => {
      try {
        // Insere o documento na tabela de documentos associado à pasta fornecida
        db.query("INSERT INTO documentos (id_pasta, nome, tipo) VALUES (?, ?, ?)", [idPasta, nomeDocumento, tipoDocumento]);
        resolve("Documento salvo com sucesso");
      } catch (error) {
        reject(`Erro ao salvar documento: ${error.message}`);
      }
    });
  };
  
  module.exports = { salvarDocumento };
