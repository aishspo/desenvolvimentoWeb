/* eslint-disable @typescript-eslint/no-var-requires */
// services/authService.js
const db = require("../server.js");
const bcrypt = require("bcryptjs");

const findUserByEmail = async (email) => {
  try {
    const [alunos] = await db.query("SELECT * FROM alunos WHERE email = ?", [
      email,
  ]);
    if (alunos.length > 0) {
      return { type: "aluno", user: alunos[0] };
    }
  
    const [professores] = await db.query("SELECT * FROM professores WHERE email = ?", [
      email,
    ]);
    if (professores.length > 0) {
      return { type: "professor", user: professores[0] };
    }
  
    return null;

  }
} catch (error) {
  throw error;
}
};

const validatePassword = async (
  inputPassword,
  senha
) => {
  return bcrypt.compare(inputPassword, senha);
};

module.exports = {
  findUserByEmail,
  validatePassword,
};
