import React, { useState } from 'react';
import '../styles/CadastroProjeto.css';
import FooterMenu from './FooterMenu';

function CadastroProj() {
  const [capaProjeto, setCapaProjeto] = useState('/capa.png');  // Caminho da imagem de capa
  const [fotoPerfil, setFotoPerfil] = useState('/perfil.png');  // Caminho da imagem de perfil
  const [showFileInput, setShowFileInput] = useState(false);

  const handleCapaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCapaProjeto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePerfilChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFotoPerfil(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = () => {
    setShowFileInput(!showFileInput);
  };

  return (
    <div className="container">
    
      <h2>Cadastre seu Projeto</h2>

      <div className="capa-projeto">
        <div className="capa-container">
          <img src={capaProjeto} alt="Capa do Projeto" />
          <div className="capa-texto">Capa do Projeto</div>
          <label className="upload-button-capa">
            +
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleCapaChange} 
            />
          </label>
        </div>
      </div>

      <div className="form">
        <div className="perfil">
          <img src={fotoPerfil} alt="Foto de Perfil" />
          <label className="upload-button-perfil">
            +
            <input 
              type="file" 
              accept="image/*" 
              onChange={handlePerfilChange} 
            />
          </label>
        </div>

        <div className="form-grid">
          <div className="campo">
            <label>Nome do Projeto</label>
            <input type="text" placeholder="Nome do Projeto" />
          </div>

          <div className="campo">
            <label>Curso</label>
            <select>
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
          </div>

          <div className="campo">
            <label>Data de Início</label>
            <input type="date" />
          </div>

          <div className="campo">
            <label>Equipe</label>
            <input type="text" placeholder="Nome da Equipe" />
          </div>
        </div>
      </div>

      <div className="botao-adicionar-projeto" onClick={handleAddProject}>
        <img src="/adicionarProjeto.png" alt="Adicionar Projeto" />
      </div>

      {showFileInput && (
        <div className="campo-arquivo">
          <label>Anexar Arquivo</label>
          <input type="file" accept=".pdf, .doc, .docx, .ppt, .pptx, .txt" />
        </div>
      )}

      <div className="descricao">
        <label>Descrição</label>
        <textarea placeholder="Descreva seu projeto"></textarea>
      </div>

      <button className="botao-salvar">Salvar</button>

      <FooterMenu />
    </div>
  );
}

export default CadastroProj;
