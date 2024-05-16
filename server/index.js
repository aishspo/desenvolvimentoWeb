/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const app = express();

// Configuração do middleware de parse do corpo da requisição
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// necessário para inserir usuários com o método post
app.use(express.json())

const port = 8000;

const rotaUsuario = require("./rotas/usuario");
app.use("/usuario", rotaUsuario);

const rotaPasta = require("./rotas/pasta");
app.use("/pasta", rotaPasta);

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});
