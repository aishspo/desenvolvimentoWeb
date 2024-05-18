/* eslint-disable @typescript-eslint/no-var-requires */
// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const loginAluno = require('../controladores/login');

router.post('/', loginAluno.loginAluno);

// router.post('/logout', loginAluno.logout);
router.post('/logout', loginAluno.logout);

module.exports = router;
