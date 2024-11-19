import express from 'express';
import cors from 'cors';
import { getAllProjeto, getProjetoF, createProjeto, updateProjeto, deleteProjeto } from '../controllers/projControler.js';

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' })); // Aumenta o limite de tamanho do corpo da requisição para 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Para aceitar dados com arquivos via URL encoded

// Configuração de CORS
app.use(cors({
  origin: 'http://localhost:5173',  // Permite apenas requisições do frontend que está rodando em localhost:5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Permite os métodos HTTP que você usa
  allowedHeaders: ['Content-Type'],  // Permite apenas cabeçalhos de tipo de conteúdo
}));

// Rotas
app.get('/projeto', getAllProjeto);
app.get('/projeto/:id', getProjetoF);
app.post('/projeto', createProjeto);
app.put('/projeto/:id', updateProjeto);
app.delete('/projeto/:id', deleteProjeto);

// Inicia o servidor
app.listen(3001, () => {
    console.log('Servidor rodando com sucesso na porta 3000');
});

export default app;
