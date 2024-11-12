import React from 'react';
import '../styles/cadastre.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cadastre() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nomeCompleto: '',
        email: '',
        telefone: '',
        data: '',
        genero: '',
        curso: '',
        senha: '',
    });

    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    };

    const validateEmailDomain = (email) => {
        const dominioPermitido = '@ba.estudante.senai.br';
        return email.endsWith(dominioPermitido);
    };

    const validateTelefone = (telefone) => {
        const re = /^\d{10,11}$/;
        return re.test(String(telefone));
    };

    const validateForm = () => {
        let formErrors = {};

        if (!formData.nomeCompleto) formErrors.nomeCompleto = 'Nome completo é obrigatório';
        if (!formData.email || !validateEmail(formData.email)) {
            formErrors.email = 'Email inválido';
        } else if (!validateEmailDomain(formData.email)) {
            formErrors.email = 'Email deve ser da instituição @ba.estudante.senai.br';
        }
        if (!formData.telefone || !validateTelefone(formData.telefone)) formErrors.telefone = 'Telefone inválido';
        if (!formData.data) formErrors.data = 'Data de nascimento é obrigatória';
        if (formData.senha.length < 8) formErrors.senha = 'Senha deve ter pelo menos 8 caracteres';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                console.log("dados a serem enviados:", formData);
                const response = await fetch('http://localhost:3000/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error(`Erro ao enviar a solicitação: ${response.status}`);
                }

                const json = await response.json();
                console.log(json);

                // Após a submissão bem-sucedida do formulário, navegue para a página inicial
                navigate('/home');
            } catch (err) {
                console.error("Erro ao enviar os dados", err);
            }
        }
    };

    return (
        <div className="cadastre-container">
            <form onSubmit={handleSubmit} className="cadastre-form">
                <h1>Criar uma conta</h1>
                
                <input
                    type="text"
                    name="nomeCompleto"
                    id="nomeCompleto"
                    placeholder="Nome Completo"
                    value={formData.nomeCompleto}
                    onChange={handleChange}
                />
                {errors.nomeCompleto && <span className="error">{errors.nomeCompleto}</span>}
                <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span className="error">{errors.email}</span>}
                <div id="cadastre-row2">
                    <input
                        type="text"
                        name="telefone"
                        id="telefone"
                        placeholder="Telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                    />
                    {errors.telefone && <span className="error">{errors.telefone}</span>}
                    <input
                        type="date"
                        name="data"
                        id="data"
                        placeholder="Data Nascimento"
                        value={formData.data}
                        onChange={handleChange}
                    />
                    {errors.data && <span className="error">{errors.data}</span>}
                </div>
                <div id="cadastre-row3">
                    <select name="genero" id="genero" value={formData.genero} onChange={handleChange}>
                        <option value="">Gênero</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Outro">Outro</option>
                    </select>
                    <select name="curso" id="curso" value={formData.curso} onChange={handleChange}>
                        <option value="">Curso</option>
                        <option value="Administração">Administração</option>
                        <option value="Automação industrial">Automação industrial</option>
                        <option value="Biotecnologia">Biotecnologia</option>
                        <option value="Desenvolvimento de sistemas">Desenvolvimento de sistemas</option>
                        <option value="Edificações">Edificações</option>
                        <option value="Eletromecânica">Eletromecânica</option>
                        <option value="Eletrotécnica">Eletrotécnica</option>
                        <option value="Logística">Logística</option>
                        <option value="Manutenção automotiva">Manutenção automotiva</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Mecânica">Mecânica</option>
                        <option value="Mecatrônica">Mecatrônica</option>
                        <option value="Multimídia">Multimídia</option>
                        <option value="Petroquímica">Petroquímica</option>
                        <option value="Qualidade">Qualidade</option>
                        <option value="Química">Química</option>
                        <option value="Redes de computadores">Redes de computadores</option>
                        <option value="Refrigeração e climatização">Refrigeração e climatização</option>
                        <option value="Segurança do trabalho">Segurança do trabalho</option>
                    </select>
                </div>
                <input
                    type="password"
                    name="senha"
                    id="senha"
                    placeholder="Senha"
                    value={formData.senha}
                    onChange={handleChange}
                />
                {errors.senha && <span className="error">{errors.senha}</span>}
                <input type="submit" value="Cadastrar" id="cadastro" />
                <a onClick={() => navigate('/')} id="logar">Fazer login</a>
            </form>
        </div>
    );
}

export default Cadastre;