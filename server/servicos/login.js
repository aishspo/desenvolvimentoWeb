/* eslint-disable @typescript-eslint/no-var-requires */
// services/authService.js
const db = require("../server.js");

const login = (email, senha, callback) => {
  db.connect((err) => {
    if (err) {
      callback(err, null);
      return;
    }

    db.query(
      "SELECT * FROM alunos WHERE email = ? AND senha = ?",
      [email, senha],
      (err, results) => {
        if (err) {
          callback(err, null);
        } else {
          if (results.length > 0) {
            callback(null, results[0]);
          } else {
            callback(new Error("Credenciais inválidas"), null);
          }
        }
        db.end();
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
