import { create, read, update, deleteProj } from '../models/projModel.js';

// Realizando insert (create)
export async function createProjeto(req, res) {
    const { capa_projeto, logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, arquivo, descricao } = req.body;
    console.log('Dados recebidos do frontend:', { capa_projeto, logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, arquivo, descricao });

    // Validação básica dos campos obrigatórios
    if (!nome_projeto || !curso_projeto || !data_inicio) {
        return res.status(400).json({ error: 'Campos obrigatórios não preenchidos: nome_projeto, curso_projeto, data_inicio' });
    }

    // Chama a função de criação do projeto
    create(capa_projeto, logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, arquivo, descricao, (err, result) => {
        if (err) {
            console.error("Erro ao criar o projeto:", err);
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ mensagem: 'Projeto criado com sucesso', projeto: result });
    });
}

// Realizando consulta
export async function getAllProjeto(req, res) {
    read((err, projeto) => {
        if (err) {
            console.error("Erro ao ler projetos:", err);
            res.status(500).json({ error: err.message });
            return;
        }

        // Verifique se 'projeto' é um array
        if (!Array.isArray(projeto)) {
            console.error("Dados retornados não são um array:", projeto);
            res.status(500).json({ error: "Dados retornados não são um array" });
            return;
        }

        console.log("Projetos lidos:", projeto);
        res.json(projeto);
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
        res.json(projeto);
    });
}

// Realizando atualização
export async function updateProjeto(req, res) {
    const { id } = req.params;
    const novosDados = req.body;

    // Validação básica de dados
    if (!novosDados || Object.keys(novosDados).length === 0) {
        return res.status(400).json({ error: 'Nenhum dado fornecido para atualização.' });
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

// Realizando delete (update/inativando)
export async function deleteProjeto(req, res) {
    const { id } = req.params;
    console.log('delete recebido do frontend: ', { id });

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
