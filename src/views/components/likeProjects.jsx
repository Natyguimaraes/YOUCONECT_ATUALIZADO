import React, { useState } from 'react';

const LikeProjetos = () => {
    const [likes, setLikes] = useState([10, 5]); // Array de curtidas

    const handleLike = (index) => { // Incrementa o número de curtidas
        const newLikes = [...likes];
        newLikes[index] += 1;
        setLikes(newLikes);
    };

    const projetos = [
        { id: 1, nome: "Projeto 1", descricao: "Descrição do projeto 1.", imgSrc: "./imgyou.png" },
        { id: 2, nome: "Projeto 2", descricao: "Descrição do projeto 2.", imgSrc: "./imgyou.png" },
        // Adicione mais projetos conforme necessário
    ];

    return (
        <div className="timeline">
            {projetos.map((projeto, index) => (
                <div className="timeline-item" key={projeto.id}>
                    <div className="timeline-content">
                        <img src={projeto.imgSrc} alt={projeto.nome} />
                        <h2>{projeto.nome}</h2>
                        <p>{projeto.descricao}</p>
                        <div className="likes">
                            <span className="like-button" onClick={() => handleLike(index)}>💙</span>
                            <span className="like-count">{likes[index]} conectes </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LikeProjetos;

