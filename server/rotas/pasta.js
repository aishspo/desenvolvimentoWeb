/* eslint-disable @typescript-eslint/no-var-requires */
const { Router } = require("express");
const { postPasta } = require("../controladores/pasta");
const router = Router();

router.post('/:email/pastas', postPasta);


module.exports = router;
