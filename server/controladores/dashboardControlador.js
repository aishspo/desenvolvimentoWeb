/* eslint-disable @typescript-eslint/no-var-requires */
const servicoUsuario = require('../servicos/servicoUsuario');

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  try {
      const results = await servicoUsuario.findUserByEmailAndPassword(email, senha);
      if (results.length > 0) {
          const user = results[0];
          req.session.user = {
              id: user.id,
              email: user.email,
              senha: user.senha,
              type: user.type
          };
          res.send({ message: 'Login successful', user: req.session.user });
      } else {
          res.status(401).send({ message: 'Invalid credentials' });
      }
  } catch (error) {
      res.status(500).send({ message: 'Error connecting to the database', error });
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.send({ message: 'Logout successful' });
};

exports.checkSession = (req, res) => {
  if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
  } else {
      res.send({ loggedIn: false });
  }
};
