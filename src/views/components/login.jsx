import '../styles/login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erro ao enviar a solicitação: ${response.status}`);
      }

      const json = await response.json();
      if (json.success) {
        navigate('/home');
      } else {
        console.error('Erro de login:', json.message);
        // Exibir mensagem de erro para o usuário
      }
    } catch (err) {
      console.error('Erro ao enviar os dados', err);
    }
  };

  return (
    <div className="login-page">
      <div className="content-wrapper">
        <div className="vector-image">
          <img src="vector_login.png" alt="Login Vector" />
        </div>
        <div className="container_login">
          <div className="login-form">
            <h1>Faça seu login<b id="ponto-h1">.</b></h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
              <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Senha"
                value={formData.senha}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <a href="#" className="forgot-password">Esqueci a Senha</a>
              <button type="submit" id="login">Entrar</button>
            </form>
            <div className="linha"></div>
            <a onClick={() => navigate('/cadastre')} id="criarconta" className="create-account">Ainda não tenho uma conta.</a>
          </div>
        </div>
      </div>
      <a href="https://pt.vecteezy.com/vetor-gratis/tela-de-login">Tela De Login Vetores por Vecteezy</a>
    </div>
  );
}

export default Login;