/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-useless-catch */
const { pool } = require("../server.js");

const servicoUsuario = {
  findUserByUsernameAndPassword: (email, senha) => {
    const query = `
        SELECT 'aluno' AS email FROM alunos WHERE email = ? AND senha = ?
        UNION
        SELECT 'professor' AS email FROM professores WHERE email = ? AND senha = ?;
    `;
    return new Promise((resolve, reject) => {
      pool.query(query, [email, senha, email, senha], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  insereAluno: async (nome, email, senha) => {
    try {
      const emailExistente = await servicoUsuario.verificaEmailExistenteAluno(
        email
      );
      if (emailExistente) {
        throw new Error("Email já cadastrado para aluno");
      }
      const sql = "INSERT INTO alunos (nome, email, senha) VALUES (?, ?, ?)";
      const [result] = await pool.query(sql, [nome, email, senha]);

      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  insereProfessor: async (nome, email, senha, disciplina) => {
    try {
      const emailExistente =
        await servicoUsuario.verificaEmailExistenteProfessor(email);
      if (emailExistente) {
        throw new Error("Email já cadastrado para professor");
      }
      const sql =
        "INSERT INTO professores (nome, email, senha, disciplina) VALUES (?, ?, ?, ?)";
      const [result] = await pool.query(sql, [nome, email, senha, disciplina]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  },

  atualizaAluno: async (email, nome, senha) => {
    try {
      let sql = "UPDATE alunos SET";
      const params = [];
      if (nome) {
        sql += " nome = ?,";
        params.push(nome);
      }
      if (senha) {
        sql += " senha = ?,";
        params.push(senha);
      }
      sql = sql.slice(0, -1); // Remove a última vírgula
      sql += " WHERE email = ?";
      params.push(email);
      const [result] = await pool.query(sql, params);
      if (result.affectedRows === 0) {
        throw new Error(
          `Nenhum aluno encontrado com o email '${email}' fornecido.`
        );
      }
      return result;
    } catch (error) {
      throw error;
    }
  },

  getAlunos: async () => {
    try {
      const [rows] = await pool.query("SELECT * FROM alunos");
      return rows;
    } catch (error) {
      throw new Error("Erro ao buscar todos os alunos.");
    }
  },

  getProfessores: async () => {
    try {
      const [rows] = await pool.query("SELECT * FROM professores");
      return rows;
    } catch (error) {
      throw new Error("Erro ao buscar todos os professores.");
    }
  },

  getAlunoPorNome: async (nome) => {
    try {
      const [rows] = await pool.query("SELECT * FROM alunos WHERE nome = ?", [
        nome,
      ]);
      return rows[0];
    } catch (error) {
      throw new Error("Erro ao buscar usuário por nome.");
    }
  },

  listarPastasAluno: async (email) => {
    try {
      const sql =
        "SELECT pastas.id, pastas.nome FROM pastas INNER JOIN alunos ON pastas.aluno_email = alunos.email WHERE alunos.email = ?";
      const [rows] = await pool.query(sql, [email]);
      return rows.map((row) => row.nome);
    } catch (error) {
      throw error;
    }
  },

  deletarAluno: async (email) => {
    let connection;
    try {
      // Obter uma conexão do server.js
      connection = await pool.getConnection();

      // Iniciar a transação
      await connection.beginTransaction();

      // Deletar as pastas associadas ao aluno
      await connection.query("DELETE FROM pastas WHERE aluno_email = ?", [
        email,
      ]);

      // Deletar o aluno
      const [result] = await connection.query(
        "DELETE FROM alunos WHERE email = ?",
        [email]
      );

      // Comitar a transação se tudo ocorrer sem erros
      await connection.commit();

      if (result.affectedRows === 0) {
        throw new Error("Nenhum aluno encontrado com o email fornecido.");
      }

      return result;
    } catch (error) {
      // Em caso de erro, faça o rollback da transação
      if (connection) {
        await connection.rollback();
      }
      throw error;
    } finally {
      // Sempre feche a conexão ao finalizar
      if (connection) {
        connection.release();
      }
    }
  },
};

const findUserByUsernameAndPassword = async (email, senha) => {
  try {
    const query = `
      SELECT 'aluno' AS type, id, email FROM alunos WHERE email = ? AND senha = ?
      UNION
      SELECT 'professor' AS type, id, email FROM professores WHERE email = ? AND senha = ?;
    `;
    const [results] = await pool.query(query, [email, senha, email, senha]); // Parâmetros duplicados para a segunda parte da consulta
    return results;
  } catch (error) {
    console.error("Erro ao executar a consulta no banco de dados:", error);
    throw error;
  }
};

module.exports = {
  servicoUsuario,
  findUserByUsernameAndPassword,
};
