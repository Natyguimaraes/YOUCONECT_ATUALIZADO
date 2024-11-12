// userControler.js

import { create, read, update, deletePes, login } from '../models/userModel.js';

// Realizando insert (create)
export async function createUsuario(req, res) {
    const { nomeCompleto, email, telefone, data, genero, curso, senha } = req.body;
    console.log('Dados recebidos do frontend:', { nomeCompleto, email, telefone, data, genero, curso, senha });

    create(nomeCompleto, email, telefone, data, genero, curso, senha, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ mensagem: 'Usuário criado com sucesso' });
    });
}

// Realizando consulta
export async function getAllUsuarios(req, res) {
    read((err, usuarios) => {
        if (err) {
            console.error("Erro ao ler usuários:", err);
            res.status(500).json({ error: err.message });
            return;
        }

        // Verifique se 'usuarios' é um array
        if (!Array.isArray(usuarios)) {
            console.error("Dados retornados não são um array:", usuarios);
            res.status(500).json({ error: "Dados retornados não são um array" });
            return;
        }

        console.log("Usuários lidos:", usuarios);
        res.json(usuarios);
    });
}


export async function getUsuariosF(req, res) {
    const { id } = req.params;

    read(id, (err, usuario) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(usuario);
    });
}

// Realizando atualização
export async function updateUsuario(req, res) {
    const { id } = req.params;
    const novosDados = req.body;
    update(id, novosDados, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Nenhuma pessoa encontrada para atualizar.' });
            return;
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    });
}

// Realizando delete (update/inativando)
export async function deleteUsuario(req, res) {
    const { id } = req.params;
    console.log('delete recebidos do frontend: ', { id });
    deletePes(id, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.send('Usuário excluído com sucesso');
    });
}

// Realizando login
export async function loginUsuario(req, res) {
    const { email, senha } = req.body;

    login(email, senha, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        if (result.length > 0) {
            res.json({ success: true, message: 'Login bem-sucedido' });
        } else {
            res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    });
}
