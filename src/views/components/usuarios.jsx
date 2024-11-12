import "../styles/home.css";

function Usuarios({ usuarios }) {

    const MAX_USUARIOS = 3; //número máximo de users a ser exibido
    const usuariosParaExibir = usuarios.slice(0, MAX_USUARIOS);

    return (
        <div className="container_usuarios">
            {usuariosParaExibir.length > 0 ? (
               usuariosParaExibir.map((usuario, index) => (
                <div key={index}>
                    <img src="./imgperfil.jpg" alt={usuario.nomeCompleto} />
                    <p>{usuario.nomeCompleto ? usuario.nomeCompleto : "Nome não disponível"}</p>
                </div>
            ))    
            ) : (
                <p>Nenhum usuário disponível.</p>
            )}
        </div>
    );
}

export default Usuarios;
