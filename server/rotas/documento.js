/* eslint-disable @typescript-eslint/no-var-requires */
// rotasDocumento.js

const express = require('express');
const router = express.Router();
const documento = require('../controladores/documento');

// Rota para inserir um documento dentro de uma pasta específica
router.post("/:idPasta/documentos", documento.postDocumento);

module.exports = router;
