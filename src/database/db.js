import mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit: 10,      // Número máximo de conexões no pool
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'youconect_project'
});

export default pool;

