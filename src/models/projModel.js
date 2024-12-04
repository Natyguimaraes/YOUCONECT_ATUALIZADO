import connection from '../database/db.js';

// Função para criar um novo projeto
export function create(logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, descricao, callback) {
    // Query para inserir dados no banco de dados, removendo campos de capa e arquivo adicional
    const query = 'INSERT INTO projeto (logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, descricao) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, descricao], callback);
}

// Função para ler todos os projetos
export function read(callback) {
    const query = 'SELECT * FROM projeto';
    connection.query(query, (error, results) => {
        if (error) {
            return callback(error);
        }
        console.log("Resultados da consulta:", results);
        callback(null, results);
    });
}

// Função para atualizar um projeto
export function update(id, novosDados, callback) {
    const { logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, descricao } = novosDados;

    // Query para atualizar dados no banco de dados
    const query = 'UPDATE projeto SET logotipo_projeto = ?, nome_projeto = ?, curso_projeto = ?, data_inicio = ?, equipe = ?, descricao = ? WHERE id = ?';
    connection.query(query, [logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, descricao, id], callback);
}

// Função para deletar um projeto
export function deleteProj(id, callback) {
    const query = 'DELETE FROM projeto WHERE id = ?';
    connection.query(query, [id], callback);
}

