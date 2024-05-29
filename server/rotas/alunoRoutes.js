const express = require('express');
const alunoController = require('../controladores/alunoController');
const router = express.Router();

router.post('/alunos', alunoController.createAluno);

module.exports = router;