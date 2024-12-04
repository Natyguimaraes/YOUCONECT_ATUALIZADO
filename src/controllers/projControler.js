import fs from 'fs';
import path from 'path';
import { create, read, update, deleteProj } from '../models/projModel.js';

export async function createProjeto(req, res) {
    const { logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, descricao, usuarios_id } = req.body;
    console.log('Dados recebidos do frontend:', { logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, descricao, usuarios_id });

    // Validação básica dos campos obrigatórios
    if (!nome_projeto || !curso_projeto || !data_inicio || !usuarios_id) {
        return res.status(400).json({ error: 'Campos obrigatórios não preenchidos: nome_projeto, curso_projeto, data_inicio, usuarios_id' });
    }

    // Verificação e processamento da imagem
    let logotipoPath = null;
    if (logotipo_projeto) {
        // Verificar se o logotipo está no formato base64
        if (logotipo_projeto.startsWith('data:image/png;base64,')) {
            const base64Data = logotipo_projeto.replace(/^data:image\/png;base64,/, '');  // Remover prefixo base64
            const buffer = Buffer.from(base64Data, 'base64');  // Converter para binário

            // Definir o caminho para salvar a imagem
            const uploadDir = path.join(__dirname, '..', 'uploads');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
                console.log(`Diretório de uploads criado: ${uploadDir}`);
            }

            logotipoPath = path.join(uploadDir, `${Date.now()}-logotipo.png`);  // Definir nome único para o arquivo
            fs.writeFileSync(logotipoPath, buffer);  // Salvar a imagem como arquivo
        } else {
            return res.status(400).json({ error: 'Formato de imagem inválido. Somente imagens PNG são permitidas.' });
        }
    }

    // Chama a função de criação do projeto no banco de dados
    create(logotipoPath, nome_projeto, curso_projeto, data_inicio, equipe, descricao, usuarios_id, (err, result) => {
        if (err) {
            console.error("Erro ao criar o projeto:", err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ mensagem: 'Projeto criado com sucesso', projeto: result });
    });
}

// Realizando consulta (todos os projetos)
export async function getAllProjeto(req, res) {
    read((err, projetos) => {
        if (err) {
            console.error("Erro ao ler projetos:", err);
            res.status(500).json({ error: err.message });
            return;
        }

        // Verifique se 'projetos' é um array
        if (!Array.isArray(projetos)) {
            console.error("Dados retornados não são um array:", projetos);
            res.status(500).json({ error: "Dados retornados não são um array" });
            return;
        }

        console.log("Projetos lidos:", projetos);
        res.json(projetos);
    });
}

// Consulta de um projeto específico
export async function getProjetoF(req, res) {
    const { id } = req.params;

    read(id, (err, projeto) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!projeto) {
            return res.status(404).json({ error: 'Projeto não encontrado' });
        }
        res.json(projeto);
    });
}

// Realizando atualização (update)
export async function updateProjeto(req, res) {
    const { id } = req.params;
    const novosDados = req.body;

    // Validação básica de dados
    if (!novosDados || Object.keys(novosDados).length === 0) {
        return res.status(400).json({ error: 'Nenhum dado fornecido para atualização.' });
    }

    // Verificar se os campos obrigatórios estão presentes
    if (!novosDados.logotipo_projeto && !novosDados.nome_projeto && !novosDados.curso_projeto && !novosDados.data_inicio) {
        return res.status(400).json({ error: 'Pelo menos um campo obrigatório deve ser fornecido para atualização.' });
    }

    update(id, novosDados, (err, result) => {
        if (err) {
            console.error("Erro ao atualizar o projeto:", err);
            res.status(500).json({ error: err.message });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Nenhum projeto encontrado para atualizar.' });
            return;
        }

        res.status(200).json({ message: 'Projeto atualizado com sucesso', result });
    });
}

// Realizando delete (deletar)
export async function deleteProjeto(req, res) {
    const { id } = req.params;
    console.log('Delete recebido do frontend: ', { id });

    deleteProj(id, (err, result) => {
        if (err) {
            console.error("Erro ao excluir o projeto:", err);
            res.status(500).json({ error: err.message });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Projeto não encontrado para exclusão.' });
            return;
        }

        res.status(200).json({ message: 'Projeto excluído com sucesso' });
    });
}

