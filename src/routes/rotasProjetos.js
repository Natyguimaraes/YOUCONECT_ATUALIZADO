import express from 'express';
import cors from 'cors';
import multer from 'multer';  // Importando o multer
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllProjeto, getProjetoF, createProjeto, updateProjeto, deleteProjeto } from '../controllers/projControler.js';


// Obtendo o diretório atual usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Definindo o diretório de uploads
const uploadDir = path.join(__dirname, '..', 'uploads');

// Verifica se o diretório de uploads existe e cria se não existir
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Diretório de uploads criado em: ${uploadDir}`);
}

// Configuração do multer para upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Caminho onde os arquivos serão armazenados
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Renomeia o arquivo para evitar conflitos de nome
  }
});

const upload = multer({ storage });

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


// Rota para criar um novo projeto com upload de arquivos
app.post('/projeto', upload.fields([

  { name: 'logotipo_projeto', maxCount: 1 },  // Logotipo do projeto
]), createProjeto);

app.put('/projeto/:id', updateProjeto);
app.delete('/projeto/:id', deleteProjeto);

// Inicia o servidor
app.listen(3001, () => {
  console.log('Servidor rodando com sucesso na porta 3001');
});

export default app;


