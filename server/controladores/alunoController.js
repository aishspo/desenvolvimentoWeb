const { pool } = require('../config/server');

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

const createAluno = async (req, res) => {
    const { nome, email, senha, ocupacao, disciplina } = req.body;

    if (!nome || !email || !senha || !ocupacao) {
        console.warn('Campos obrigatórios faltando na solicitação');
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    try {
        if (ocupacao === "aluno") {
            const [result] = await pool.query('INSERT INTO alunos (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);
            res.status(201).send({ message: "Aluno cadastrado com sucesso!" });
        } else if (ocupacao === "professor") {
            const [result] = await pool.query('INSERT INTO professores (nome, email, senha, disciplina) VALUES (?, ?, ?, ?)', [nome, email, senha, disciplina]);
            res.status(201).send({ message: "Professor cadastrado com sucesso!" });
        } else {
            console.warn('Ocupação inválida fornecida');
            return res.status(400).json({ error: "Ocupação inválida" });
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    checkEmailExists,
    createAluno
};
