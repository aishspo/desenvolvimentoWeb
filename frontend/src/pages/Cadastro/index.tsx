import React, { useState } from 'react';
import axios from 'axios';

interface FormData {
    nome: string;
    email: string;
    senha: string;
    ocupacao: 'aluno' | 'professor';
    disciplina?: string;
}

const CadastroUsuario: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        email: '',
        senha: '',
        ocupacao: 'aluno',
        disciplina: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/cadastro', formData);
            alert('Usuário cadastrado com sucesso');
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário');
        }
    };

    return (
        <div>
            <h1>Cadastro de Usuário</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome">Nome:</label><br />
                <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required /><br /><br />

                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required /><br /><br />

                <label htmlFor="senha">Senha:</label><br />
                <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} required /><br /><br />

                <label htmlFor="ocupacao">Ocupação:</label><br />
                <select id="ocupacao" name="ocupacao" value={formData.ocupacao} onChange={handleChange} required>
                    <option value="aluno">Aluno</option>
                    <option value="professor">Professor</option>
                </select><br /><br />

                {formData.ocupacao === 'professor' && (
                    <>
                        <label htmlFor="disciplina">Disciplina:</label><br />
                        <input type="text" id="disciplina" name="disciplina" value={formData.disciplina} onChange={handleChange} /><br /><br />
                    </>
                )}

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default CadastroUsuario;
