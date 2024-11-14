import express from 'express';
import cors from 'cors';
import { getAllProjeto, getProjetoF, createProjeto, updateProjeto, deleteProjeto } from '../controllers/projControler.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rotas
app.get('/projeto', getAllProjeto);
app.get('/projeto/:id', getProjetoF);
app.post('/projeto', createProjeto);
app.put('/projeto/:id', updateProjeto);
app.delete('/projeto/:id', deleteProjeto);


// Inicia o servidor
app.listen(3000, () => {
    console.log('Servidor rodando com sucesso na porta 3000');
});

export default app;