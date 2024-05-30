/* eslint-disable @typescript-eslint/no-var-requires */
const pool = require('../config/server');
const bcrypt = require('bcryptjs');

const findUserByEmail = async (email) => {
  try {
    const [students] = await pool.query('SELECT * FROM alunos WHERE email = ?', [email]);
    if (students.length > 0) {
      return { type: 'aluno', user: students[0] };
    }

    const [teachers] = await pool.query('SELECT * FROM professores WHERE email = ?', [email]);
    if (teachers.length > 0) {
      return { type: 'professor', user: teachers[0] };
    }

    return null;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw new Error('Database query error');
  }
};

const validatePassword = async (inputPassword, storedPassword) => {
  try {
    if (!inputPassword || !storedPassword) {
      throw new Error('Password arguments cannot be undefined');
    }

    return await bcrypt.compare(inputPassword, storedPassword);
  } catch (error) {
    console.error('Error validating password:', error);
    throw new Error('Password validation error');
  }
};

module.exports = {
  findUserByEmail,
  validatePassword,
};
