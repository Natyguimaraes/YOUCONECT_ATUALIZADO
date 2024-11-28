// Projetos.js
import React from 'react';
import "../styles/home.css";

// Componente Projetos
function Projetos({ projetos }) {
  const MAX_PROJETOS = 3; // Número máximo de projetos a ser exibido
  const projetosParaExibir = projetos.slice(0, MAX_PROJETOS);

  return (
    <div className="container_projetos">
      {projetosParaExibir.length > 0 ? (
        projetosParaExibir.map((projeto, index) => (
          <div key={index} className="projeto-item">
            <img src={projeto.logotipo_projeto || "./imgperfil.jpg"} alt={projeto.nome_projeto} />
            <p>{projeto.nome_projeto}</p>
            <p>{projeto.descricao}</p>
          </div>
        ))
      ) : (
        <p>Nenhum projeto disponível.</p>
      )}
    </div>
  );
}

export default Projetos;

