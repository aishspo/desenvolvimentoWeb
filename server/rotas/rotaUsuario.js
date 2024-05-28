/* eslint-disable @typescript-eslint/no-var-requires */
const { Router } = require("express");
const { getUsuarios, postUsuario, patchAluno, deleteAluno } = require("../controladores/usuarioControlador");
const router = Router();

router.get("/", getUsuarios);

router.post("/", postUsuario)

router.patch("/", patchAluno)
router.delete("/:email", deleteAluno)

module.exports = router;
