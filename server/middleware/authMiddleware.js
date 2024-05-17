// middleware/authMiddleware.js
const authMiddleware = (req, res, next) => {
    if (req.session.userId) {
      next();
    } else {
      res.status(401).send('Acesso não autorizado');
    }
  };
  
  module.exports = authMiddleware;
  