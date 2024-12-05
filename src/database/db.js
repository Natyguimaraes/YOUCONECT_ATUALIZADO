import mysql2 from 'mysql2';

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'youconect_project'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao realizar conexão com o banco de dados', err);
        throw err;
    }

    console.log('Conexão com o banco de dados estabelecida com sucesso!');
});

export default connection;

