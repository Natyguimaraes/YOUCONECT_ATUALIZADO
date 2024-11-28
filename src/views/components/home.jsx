// Home.js
import { useEffect, useState } from "react";
import "../styles/home.css";
import FooterMenu from './FooterMenu';
import Usuarios from "./usuarios";
import LikeProjetos from "./likeProjects";

function Home() {
    const [usuarios, setUsuarios] = useState([]);
    const [projetos, setProjetos] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response = await fetch('http://localhost:3000/usuarios');
                if (!response.ok) {
                    throw new Error(`Erro ao buscar usuários: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);

                if (Array.isArray(data)) {
                    setUsuarios(data);
                } else {
                    console.error('A resposta da API não é uma lista', data);
                }
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        fetchUsuarios();
    }, []);

    useEffect(() => {
        const fetchProjetos = async () => {
            try {
                const response = await fetch('http://localhost:3001/projeto');
                const data = await response.json();
                setProjetos(data); // Define os projetos no estado
            } catch (err) {
                console.error('Erro ao carregar projetos:', err);
            }
        };
        fetchProjetos();
    }, []);

    return (
        <div className="container_pai">
            <div className="container_home">
                <h1>Projetos</h1>
                <LikeProjetos projetos={projetos} /> {/* Passando 'projetos' corretamente para o LikeProjetos */}

                <h1>Usuários Sugeridos</h1>
                <Usuarios usuarios={usuarios} />
            </div>
            <FooterMenu />
        </div>
    );
}

export default Home;

