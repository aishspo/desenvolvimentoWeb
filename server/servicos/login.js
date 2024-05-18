/* eslint-disable @typescript-eslint/no-var-requires */
// services/authService.js
const db = require("../server.js");

const login = (email, senha, callback) => {
  db.connect((err) => {
    if (err) {
      callback(err, null);
      return;
    }

    // Primeiro, tentar autenticar como aluno
    db.query(
      "SELECT * FROM alunos WHERE email = ? AND senha = ?",
      [email, senha],
      (err, results) => {
        if (err) {
          db.end();
          callback(err, null);
        } else if (results.length > 0) {
          db.end();
          callback(null, { user: results[0], type: 'aluno' });
        } else {
          // Se não encontrou na tabela de alunos, tentar na tabela de professores
          db.query(
            "SELECT * FROM professores WHERE email = ? AND senha = ?",
            [email, senha],
            (err, results) => {
              if (err) {
                callback(err, null);
              } else if (results.length > 0) {
                callback(null, { user: results[0], type: 'professor' });
              } else {
                callback(new Error("Credenciais inválidas"), null);
              }
              db.end();
            }
          );
        }
      }
    );
  });
};




const logoutUser = (req) => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  login,
  logoutUser
};
