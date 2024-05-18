/* eslint-disable @typescript-eslint/no-var-requires */
const db = require("../server.js"); // arquivo de configuração do banco de dados

const servicoUsuario = {
  verificaEmailExistenteAluno: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM alunos WHERE email = ?",
        [email],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const totalAlunos = results[0].total;
            resolve(totalAlunos > 0); // Resolve com true se o email já existe para alunos, caso contrário, resolve com false
          }
        }
      );
    });
  },

  verificaEmailExistenteProfessor: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT COUNT(*) AS total FROM professores WHERE email = ?",
        [email],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const totalProfessores = results[0].total;
            resolve(totalProfessores > 0); // Resolve com true se o email já existe para professores, caso contrário, resolve com false
          }
        }
      );
    });
  },

  insereAluno: (nome, email, senha) => {
    return new Promise((resolve, reject) => {
      // Inserir aluno se o email não estiver cadastrado
      servicoUsuario
        .verificaEmailExistenteAluno(email)
        .then((emailExistente) => {
          if (emailExistente) {
            reject("Email já cadastrado para aluno");
          } else {
            const sql =
              "INSERT INTO alunos (nome, email, senha) VALUES (?, ?, ?)";
            db.query(sql, [nome, email, senha], (error, results) => {
              if (error) {
                reject(error);
              } else {
                resolve(results);
              }
            });
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  insereProfessor: (nome, email, senha, disciplina) => {
    return new Promise((resolve, reject) => {
      // Inserir professor se o email não estiver cadastrado
      servicoUsuario
        .verificaEmailExistenteProfessor(email)
        .then((emailExistente) => {
          if (emailExistente) {
            reject("Email já cadastrado para professor");
          } else {
            const sql =
              "INSERT INTO professores (nome, email, senha, disciplina) VALUES (?, ?, ?, ?)";
            db.query(
              sql,
              [nome, email, senha, disciplina],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              }
            );
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // atualizaAluno: (email, nome, senha) => {
  //   return new Promise((resolve, reject) => {
  //     const sql = "UPDATE alunos SET nome = ?, senha = ? WHERE email = ?";
  //     db.query(sql, [nome, senha, email], (error, results) => {
  //       if(error) {
  //         reject(error)
  //       } else {
  //         resolve(results)
  //       }
  //     })
  //   })},

  //   atualizaAluno: (email, nome, senha) => {
  //     return new Promise((resolve, reject) => {
  //         const sql = "UPDATE alunos SET nome = ?, senha = ? WHERE email = ?";
  //         db.query(sql, [nome, senha, email], (error, results) => {
  //             if (error) {
  //                 reject(error);
  //             } else if (results.affectedRows === 0) {
  //                 reject(new Error("Nenhum aluno encontrado com o email fornecido."));
  //             } else {
  //                 resolve(results);
  //             }
  //         });
  //     });
  // },

  atualizaAluno: (email, nome, senha) => {
    return new Promise((resolve, reject) => {
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
      // Remover a última vírgula
      sql = sql.slice(0, -1);
      sql += " WHERE email = ?";
      params.push(email);

      db.query(sql, params, (error, results) => {
        if (error) {
          reject(error);
        } else if (results.affectedRows === 0) {
          reject(
            new Error(
              `Nenhum aluno encontrado com o email '${email}' fornecido.`
            )
          );
        } else {
          resolve(results);
        }
      });
    });
  },

  removeAluno: async (email) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM alunos WHERE email = ?";
      db.query(sql, [email], (error, results) => {
        if (error) {
          reject(error);
        } else if (results.affectedRows === 0) {
          reject(new Error("Nenhum aluno encontrado com o email fornecido."));
        } else {
          resolve();
        }
      });
    });
  },

  // removeProfessor: async (email) => {
  //   const sql = "DELETE FROM professores WHERE email = ?";
  //   await db.query(sql, [email]);
  // },

  getAlunos: () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alunos";
      db.query(sql, (error, results) => {
        if (error) {
          reject("Erro ao buscar todos os professores");
        } else {
          resolve(results);
        }
      });
    });
  },

  getProfessores: () => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM professores";
      db.query(sql, (error, results) => {
        if (error) {
          console.error("Erro ao buscar por todos os alunos:", error);
          reject("Erro ao buscar por todos os alunos");
          return;
        }
        resolve(results);
      });
    });
  },

  getAlunoPorNome: (nome) => {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM alunos WHERE nome = ?";

      db.query(sql, [nome], (error, results) => {
        if (error) {
          console.error("Erro ao buscar usuário por nome:", error);
          reject("Erro ao buscar usuário por nome");
          return;
        }

        // Retorna o primeiro usuário encontrado com o nome especificado
        resolve(results[0]);
      });
    });
  },

  listarPastasAluno: (email) => {
    return new Promise((resolve, reject) => {
      const sql =
        "SELECT pastas.id, pastas.nome FROM pastas INNER JOIN alunos ON pastas.aluno_email = alunos.email WHERE alunos.email = ?";
      db.query(sql, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  deletarAluno: (email) => {
    return new Promise((resolve, reject) => {
      db.beginTransaction((err) => {
        if (err) {
          return reject(err);
        }
  
        // Delete folders associated with the user
        db.query('DELETE FROM pastas WHERE aluno_email = ?', [email], (error, results) => {
          if (error) {
            return db.rollback(() => {
              reject(error);
            });
          }
  
          // Delete the user
          db.query('DELETE FROM alunos WHERE email = ?', [email], (error, results) => {
            if (error) {
              return db.rollback(() => {
                reject(error);
              });
            }
  
            db.commit((err) => {
              if (err) {
                return db.rollback(() => {
                  reject(err);
                });
              }
              resolve(results);
            });
          });
        });
      });
    });
  },
};

module.exports = {
  servicoUsuario,
};
