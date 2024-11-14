import connection from '../database/db.js';

export function create(capa_projeto, logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, arquivo, descricao, callback) {
    const query = 'INSERT INTO projeto (capa_projeto, logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, arquivo, descricao) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [capa_projeto, logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, arquivo, descricao], callback);
}

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


export function update(id, novosDados, callback) {
    const { capa_projeto, logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, arquivo, descricao } = novosDados;
    const query = 'UPDATE projeto SET capa_projeto = ?, logotipo_projeto = ?, nome_projeto = ?, curso_projeto = ?, data_inicio = ?, equipe = ?, arquivo = ?, descricao = ?, WHERE id = ?';
    connection.query(query, [capa_projeto, logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, arquivo, descricao, id], callback);
}

export function deleteProj(id, callback) {
    const query = 'DELETE FROM projeto WHERE id = ?';
    connection.query(query, [id], callback);
}
