const {pool} = require('../config/server');

const findUserByUsernameAndPassword = async (email, senha) => {
    try {
      // Verifica na tabela "alunos"
      const alunoQuery = 'SELECT id, email, "aluno" as type FROM alunos WHERE email = ? AND senha = ?';
      const [alunoRows] = await pool.execute(alunoQuery, [email, senha]);
  
      if (alunoRows.length > 0) {
        return alunoRows;
      }
  
      // Verifica na tabela "professores"
      const professorQuery = 'SELECT id, email, "professor" as type FROM professores WHERE email = ? AND senha = ?';
      const [professorRows] = await pool.execute(professorQuery, [email, senha]);
  
      return professorRows;
    } catch (error) {
      console.error('Erro ao buscar usuário no banco de dados:', error);
      throw error;
    }
  };

const checkEmailExists = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT email FROM alunos WHERE email = ?', [email], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results.length > 0);
        });
    });
};

const createAluno = (nome, email, senha) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO alunos (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results.insertId);
        });
    });
};

module.exports = {
    checkEmailExists,
    createAluno,
    findUserByUsernameAndPassword
};
