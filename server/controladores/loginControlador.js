/* eslint-disable @typescript-eslint/no-var-requires */

const servicoUsuario = require("../servicos/servicoUsuario");

const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
      console.log('Tentando encontrar usuário com email:', email);
      const results = await servicoUsuario.findUserByUsernameAndPassword(email, senha);
      if (results.length > 0) {
          const user = results[0];

          req.session.user = {
              id: user.id,
              email: user.email,
              type: user.type
          };
          
          console.log('Login bem-sucedido para usuário:', user.email);
          res.send({ message: 'Login successful', user: req.session.user });
      } else {
          console.log('Credenciais inválidas para email:', email);
          res.status(401).send({ message: 'Invalid credentials' });
      }
  } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      res.status(500).send({ message: 'Erro ao conectar ao banco de dados', error });
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao encerrar sessão:', err);
      res.status(500).send({ message: 'Erro ao encerrar sessão', error: err });
    } else {
      res.send({ message: 'Logout successful' });
    }
  });
};

const checkSession = (req, res) => {
  if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
  } else {
      res.send({ loggedIn: false });
  }
};

module.exports = {
    login, logout, checkSession
};
