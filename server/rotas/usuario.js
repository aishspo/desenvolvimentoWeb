/* eslint-disable @typescript-eslint/no-var-requires */
const { Router } = require("express");
const { getUsuarios, postUsuario,patchAluno, deleteAluno, getPastasAluno } = require("../controladores/usuario");
const router = Router();

router.get("/", getUsuarios);
router.get("/:email/pastas", getPastasAluno);
// router.get("/:nome", getAluno);

router.post("/", postUsuario)

router.patch("/:email", patchAluno)
router.delete("/:email", deleteAluno)

module.exports = router;
