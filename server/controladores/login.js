/* eslint-disable @typescript-eslint/no-var-requires */
// controllers/authController.js
const login = require('../servicos/login');

async function loginAluno(req, res) {
    const { email, senha } = req.body;
    try {
        login.login(email, senha, (err, user) => {
        if (err) {
          console.error('Erro na autenticação', err);
          res.status(401).send('Credenciais inválidas');
        } else {
          req.session.userId = user.id;
          res.send('Login realizado com sucesso');
        }
      });
    } catch (error) {
      console.error('Erro na autenticação', error);
      res.status(500).send('Erro interno do servidor');
    }
  }

  const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Erro ao deslogar', err);
        res.status(500).send('Erro ao deslogar');
      } else {
        res.send('Logout realizado com sucesso');
      }
    });
  };



module.exports = {
    loginAluno,
    logout
};
