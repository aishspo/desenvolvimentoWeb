/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const router = express.Router();
const loginControlador = require('../controladores/loginControlador');

router.post('/', loginControlador.login);
router.post('/logout', loginControlador.logout);
router.get('/checkSession', loginControlador.checkSession);

module.exports = router;
