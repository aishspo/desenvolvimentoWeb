/* eslint-disable @typescript-eslint/no-var-requires */
const { Router } = require("express");
const { postPasta, getPastasAluno } = require("../controladores/pastaControlador");
const router = Router();

router.post('/pastas', postPasta);
router.get("/pastas", getPastasAluno);
module.exports = router;
