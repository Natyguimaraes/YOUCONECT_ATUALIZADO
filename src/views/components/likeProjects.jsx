import React, { useState } from 'react';
import "../styles/home.css";

const LikeProjetos = ({ projetos }) => {
    const [likes, setLikes] = useState(projetos.map(() => 0)); // Inicializa o número de curtidas para cada projeto

    const handleLike = (index) => { // Incrementa o número de curtidas
        const newLikes = [...likes];
        newLikes[index] += 1;
        setLikes(newLikes);
    };

    return (
        <div className="timeline">
            {projetos.map((projeto, index) => (
                <div className="timeline-item" key={projeto.id}>
                    <div className="timeline-content">
                        {/* Exibindo a imagem do logotipo do projeto */}
                        <img
                            src={projeto.logotipo_projeto} // Usando diretamente o link da imagem
                            alt={projeto.nome_projeto}
                            onError={(e) => e.target.src = './imgperfil.jpg'} // Caso a imagem não seja encontrada
                        />
                        <h2>{projeto.nome_projeto}</h2>
                        <p>{projeto.descricao}</p>
                        <div className="likes">
                            <span className="like-button" onClick={() => handleLike(index)}>💙</span>
                            <span className="like-count">{likes[index]} conectes</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LikeProjetos;
