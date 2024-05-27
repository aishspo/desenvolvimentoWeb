/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const session = require("express-session");
const cors = require("cors");
// const bodyParser = require("body-parser");

const app = express();
const port = 8000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Configuração session
app.use(
  session({
    secret: "shh",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 30000 }, // Definido em milissegundos, 30000 ms = 30 segundos
  })
);

// Importação de rotas
const rotaUsuario = require("./rotas/usuario");
const rotaPasta = require("./rotas/pasta");
const rotaDocumento = require("./rotas/documento");
const rotaLogin = require("./rotas/rotaLogin");

app.use("/usuario", rotaUsuario);
app.use("/aluno-dashboard", rotaPasta);
app.use("/documento", rotaDocumento)
app.use('/login', rotaLogin);

app.listen(port, () => {
  console.log(`Rodando na porta http://localhost:${port}`);
});
