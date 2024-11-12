import { useEffect, useState } from "react";
import "../styles/pesquisa.css";
import Usuarios from "./usuarios"; // Certifique-se de que o caminho está correto
import FooterMenu from "./FooterMenu";
import { FaSearch } from "react-icons/fa";

function Pesquisa() {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsuarios = async () => {
            if (searchTerm.trim() === "") {
                setUsuarios([]); // Limpa os usuários se não houver termo de pesquisa
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/usuarios?search=${searchTerm}`);
                if (!response.ok) {
                    throw new Error(`Erro ao buscar usuários: ${response.status}`);
                }
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
            }
        };

        fetchUsuarios();
    }, [searchTerm]); // Refaça a requisição sempre que 'searchTerm' mudar

    return (
        <>
            <div className="container_pesquisa">
                <h1>Pesquisar Usuários</h1>
                <input
                    type="text"
                    placeholder="Buscar usuários..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} />
                <FaSearch />
                {usuarios.length > 0 ? (
                    <Usuarios usuarios={usuarios} />
                ) : (
                    <p>Nenhum usuário encontrado.</p>
                )}
            </div>
            <FooterMenu />
        </>
    );
}

export default Pesquisa;

