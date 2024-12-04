import React, { useState } from 'react';
import '../styles/CadastroProjeto.css';
import FooterMenu from './FooterMenu';
import { useNavigate } from 'react-router-dom';

function CadastroProj() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    logotipo_projeto: '/perfil.png',  // Inicializando com um valor padrão
    nome_projeto: '',
    curso_projeto: '',
    data_inicio: '',
    equipe: '',
    descricao: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePerfilChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({
          ...formData,
          logotipo_projeto: reader.result,  // Armazenando imagem como Base64
        });
      };
      reader.readAsDataURL(file);  // Converte imagem para Base64
    }
  };

  const validateForm = () => {
    let formErrors = {};

    // Validação dos campos obrigatórios
    if (!formData.nome_projeto) formErrors.nome_projeto = 'Nome do projeto é obrigatório';
    if (!formData.curso_projeto) formErrors.curso_projeto = 'Curso é obrigatório';
    if (!formData.data_inicio) formErrors.data_inicio = 'Data de início é obrigatória';
    if (!formData.equipe) formErrors.equipe = 'Nome da equipe é obrigatório';
    if (!formData.descricao) formErrors.descricao = 'Descrição do projeto é obrigatória';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        console.log("Dados a serem enviados:", formData);

        const response = await fetch('http://localhost:3001/projeto', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),  // Envia os dados com a imagem em Base64
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
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Cadastre seu Projeto</h2>

        {/* Logotipo do Projeto */}
        <div className="perfil">
          <img src={formData.logotipo_projeto} alt="Logotipo do Projeto" />
          <label className="upload-button-perfil">
            +
            <input 
              type="file" 
              accept="image/*" 
              onChange={handlePerfilChange} 
            />
          </label>
        </div>

        {/* Campos do Formulário */}
        <div className="form-grid">
          <div className="campo">
            <input
              type="text"
              name="nome_projeto"
              placeholder="Nome do Projeto"
              value={formData.nome_projeto}
              onChange={handleChange}
            />
            {errors.nome_projeto && <span className="error">{errors.nome_projeto}</span>}
          </div>

          <div className="campo">
            <select
              name="curso_projeto"
              value={formData.curso_projeto}
              onChange={handleChange}
            >
              <option value="">Selecione o curso</option>
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
            {errors.curso_projeto && <span className="error">{errors.curso_projeto}</span>}
          </div>

          <div className="campo">
            <input
              type="date"
              name="data_inicio"
              value={formData.data_inicio}
              onChange={handleChange}
            />
            {errors.data_inicio && <span className="error">{errors.data_inicio}</span>}
          </div>

          <div className="campo">
            <input
              type="text"
              name="equipe"
              placeholder="Nome da Equipe"
              value={formData.equipe}
              onChange={handleChange}
            />
            {errors.equipe && <span className="error">{errors.equipe}</span>}
          </div>
        </div>

        {/* Descrição do Projeto */}
        <div className="descricao">
          <textarea
            name="descricao"
            placeholder="Descreva seu projeto"
            value={formData.descricao}
            onChange={handleChange}
          ></textarea>
          {errors.descricao && <span className="error">{errors.descricao}</span>}
        </div>

        <button type="submit" className="botao-salvar">
          Salvar
        </button>
      </form>

      <FooterMenu />
    </div>
  );
}

export default CadastroProj;


