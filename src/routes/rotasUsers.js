import express from 'express';
import cors from 'cors';
import { getAllUsuarios, getUsuariosF, createUsuario, updateUsuario, deleteUsuario, loginUsuario } from '../controllers/userControler.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rotas
app.get('/usuarios', getAllUsuarios);
app.get('/usuarios/:id', getUsuariosF);
app.post('/usuarios', createUsuario);
app.put('/usuarios/:id', updateUsuario);
app.delete('/usuarios/:id', deleteUsuario);
app.post('/login', loginUsuario); // Rota de login adicionada

// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando com sucesso na porta 3000');
});

export default app;
