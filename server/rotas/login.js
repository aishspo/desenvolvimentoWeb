/* eslint-disable @typescript-eslint/no-var-requires */
// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const loginAluno = require('../controladores/login');

router.post('/', loginAluno.loginAluno);

// router.post('/logout', loginAluno.logout);
router.post('/logout', (req, res) => {
    req.logout(); // Limpa o estado de autenticação do usuário
    res.redirect('/'); // Redireciona para a página inicial ou para onde for apropriado após o logout
  });

module.exports = router;
