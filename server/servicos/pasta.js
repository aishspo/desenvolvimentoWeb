// Responsável por lidar com as operações relacionadas às pastas

/* eslint-disable @typescript-eslint/no-var-requires */

const { pool } = require("../config/server.js"); // arquivo de configuração do banco de dados

const servicoPasta = {
  criarPasta: (aluno_email, nomePasta) => {
    return new Promise((resolve, reject) => {
      try {
        // Verifica se o aluno com o email fornecido existe
        const aluno = pool.query("SELECT * FROM alunos WHERE email = ?", [
          aluno_email,
        ]);

        // Se o aluno não existir, retorne um erro
        if (aluno.length === 0) {
          throw new Error("Aluno não encontrado");
        }

        // Cria a pasta associada ao aluno correspondente
        pool.query("INSERT INTO pastas (nome, aluno_email) VALUES (?, ?)", [
          nomePasta,
          aluno_email,
        ]);

        resolve("Pasta criada com sucesso");
      } catch (error) {
        reject(`Erro ao criar pasta: ${error.message}`);
      }
    });
  },

  getPasta: (aluno_email) => {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM pastas WHERE aluno_email = ?`;
      pool.query(query, [aluno_email], (error, result) => {
        if (error) {
          reject(new Error("Erro ao buscar pastas do aluno"));
        } else {
          resolve(result);
        }
      });
    });
  },

  listarPastasAluno: (email) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT pastas.id, pastas.nome 
        FROM pastas 
        INNER JOIN alunos ON pastas.aluno_email = alunos.email 
        WHERE alunos.email = ?`;
  
      console.log("Executando query SQL:", sql);
      console.log("Parâmetros:", [email]);
  
      pool.query(sql, [email], (error, results) => {
        if (error) {
          console.error("Erro ao executar a query:", error);
          reject(error);
        } else {
          console.log("Resultados do banco de dados:", results);
  
          const pastas = results.map((pasta) => ({
            id: pasta.id,
            nome: pasta.nome,
          }));
          
          console.log("Resultados mapeados:", pastas);
          resolve(pastas);
        }
      });
    });
  },
  
};

module.exports = {
  servicoPasta,
};
