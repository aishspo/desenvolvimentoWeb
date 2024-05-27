/* eslint-disable @typescript-eslint/no-var-requires */
const { Router } = require("express");
const { getUsuarios, postUsuario,patchAluno, deleteAluno, getPastasAluno } = require("../controladores/usuarioControlador");
const router = Router();

router.get("/", getUsuarios);
router.get("/pastas", getPastasAluno);

router.post("/", postUsuario)

router.patch("/:email", patchAluno)
router.delete("/:email", deleteAluno)

module.exports = router;
