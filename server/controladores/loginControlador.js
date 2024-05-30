/* eslint-disable @typescript-eslint/no-var-requires */

const alunoService = require("../servicos/alunoService");

const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
      console.log('Tentando encontrar usuário com email:', email);
      const results = await alunoService.findUserByUsernameAndPassword(email, senha);
      if (results.length > 0) {
          const user = results[0];

          req.session.user = {
              id: user.id,
              email: user.email,
              type: user.type
          };
          
          // Redirecionando para dashboards diferentes com base no tipo de usuário
      if (user.type === 'aluno') {
        res.status(200).json({
          message: 'Login realizado com sucesso!',
          dashboard: 'alunoDashboard',
          user: req.session.user
        });
      } else if (user.type === 'professor') {
        res.status(200).json({
          message: 'Login realizado com sucesso!',
          dashboard: 'professorDashboard',
          user: req.session.user
        });
      }
    } else {
      // Caso nenhum usuário seja encontrado
      res.status(401).json({
        message: 'Email ou senha inválidos.'
      });
    }
  } catch (error) {
    // Tratando erros
    console.error('Erro ao tentar fazer login:', error);
    res.status(500).json({
      message: 'Erro interno do servidor. Por favor, tente novamente mais tarde.'
    });
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
