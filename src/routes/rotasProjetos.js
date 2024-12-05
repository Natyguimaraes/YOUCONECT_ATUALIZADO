import express from 'express';
import cors from 'cors';
import { getAllProjeto, getProjetoF, createProjeto, updateProjeto, deleteProjeto } from '../controllers/projControler.js';

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Configuração de CORS
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Rota para criar um novo projeto
app.post('/projeto', createProjeto); // Rota para criação de projetos

// Rota para obter todos os projetos
app.get('/projeto', getAllProjeto);

// Rota para obter um projeto específico
app.get('/projeto/:id', getProjetoF);

// Rota para atualizar um projeto
app.put('/projeto/:id', updateProjeto);

// Rota para deletar um projeto
app.delete('/projeto/:id', deleteProjeto);

// Inicia o servidor
app.listen(3001, () => {
  console.log('Servidor rodando com sucesso na porta 3001');
});

export default app;
