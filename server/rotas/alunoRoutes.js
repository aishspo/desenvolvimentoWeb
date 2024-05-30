const express = require('express');
const alunoController = require('../controladores/alunoController');
const router = express.Router();

router.post('/', alunoController.createAluno);

module.exports = router;