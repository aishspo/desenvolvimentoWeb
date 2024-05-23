/* eslint-disable @typescript-eslint/no-var-requires */
// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {login, logout} = require('../controladores/login');

router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
