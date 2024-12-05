import connection from '../database/db.js';

export function create(logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, descricao, callback) {


    const query = 'INSERT INTO projeto (logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, descricao) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [ logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, descricao], callback);
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
    const { logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, descricao } = novosDados;
    const query = 'UPDATE projeto SET logotipo_projeto = ?, nome_projeto = ?, curso_projeto = ?, data_inicio = ?, equipe = ?, descricao = ?, WHERE id = ?';
    connection.query(query, [logotipo_projeto, nome_projeto, curso_projeto, data_inicio, equipe, descricao, id], callback);
}

export function deleteProj(id, callback) {
    const query = 'DELETE FROM projeto WHERE id = ?';
    connection.query(query, [id], callback);
}

