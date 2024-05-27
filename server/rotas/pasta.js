/* eslint-disable @typescript-eslint/no-var-requires */
const { Router } = require("express");
const { postPasta, getPastaPorId } = require("../controladores/pastaControlador");
const router = Router();

router.post('/:email/pastas', postPasta);
router.get('/:id', getPastaPorId)


module.exports = router;
