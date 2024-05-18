/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const app = express();
const session = require("express-session");

// Configuração do middleware de parse do corpo da requisição
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// necessário para inserir usuários com o método post
app.use(express.json());

const port = 8000;

const rotaUsuario = require("./rotas/usuario");
app.use("/usuario", rotaUsuario);

const rotaPasta = require("./rotas/pasta");
app.use("/pasta", rotaPasta);

const rotaDocumento = require("./rotas/documento");
app.use("/documento", rotaDocumento);

app.use(express.json());

app.use(
  session({
    secret: "shh",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true },
  })
);

const { loginAluno } = require("./controladores/login");
app.use("/auth", loginAluno);

const rotaDashboard = require("./rotas/dashboard");
app.use("/dashboard", rotaDashboard);

app.listen(port, () => {
  console.log(`Escutando a porta ${port}`);
});
