/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const alunoRoutes = require('./rotas/alunoRoutes');

const app = express();
const port = 8000;
app.use(bodyParser.json());

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
    cookie: { secure: false}, // Definido em milissegundos, 30000 ms = 30 segundos
  })
);

// Importação de rotas
const rotaUsuario = require("./rotas/rotaUsuario");
const rotaPasta = require("./rotas/rotaPasta");
const rotaDocumento = require("./rotas/documento");
const rotaLogin = require("./rotas/rotaLogin");

app.use("/usuario", rotaUsuario);
app.use("/aluno-dashboard", rotaPasta);
app.use("/documento", rotaDocumento)
app.use('/cadastro', alunoRoutes);
app.use('/login', rotaLogin);

app.listen(port, () => {
  console.log(`Rodando na porta http://localhost:${port}`);
});
