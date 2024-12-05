import React, { useState, useEffect } from 'react';
import "../styles/home.css";

const LikeProjetos = ({ projetos }) => {
    // Inicializa o número de curtidas com base nos projetos
    const [likes, setLikes] = useState(projetos.map(() => 0));

    useEffect(() => {
        // Reseta o estado de curtidas quando os projetos mudam
        setLikes(projetos.map(() => 0));
    }, [projetos]);

    const handleLike = (index) => {
        // Atualiza o estado de likes de forma eficiente
        setLikes((prevLikes) => {
            const newLikes = [...prevLikes];
            newLikes[index] += 1;
            return newLikes;
        });
    };

    return (
        <div className="timeline">
            {projetos.map((projeto, index) => (
                <div className="timeline-item" key={projeto.id}>
                    <div className="timeline-content">
                        <img
                            src={projeto.logotipo_projeto}
                            alt={projeto.nome_projeto}
                            onError={(e) => e.target.src = './imgperfil.jpg'} 
                        />
                        <h2>{projeto.nome_projeto}</h2>
                        <p>{projeto.descricao}</p>
                        <div className="likes">
                            <span className="like-button" onClick={() => handleLike(index)}>😍</span>
                            <span className="like-count">{likes[index]} conectes </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LikeProjetos;


