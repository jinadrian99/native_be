const { createPool } = require('mysql');

const pool = createPool({
    port: process.env.DB_PORT||8889,
    host: process.env.DB_HOST||"127.0.0.1",
    user: process.env.DB_USER||"root",
    password: process.env.DB_PASS||"root",
    database: process.env.MYSQL_DB||"nativecity",
    connectionLimit: 100,
});

module.exports = pool;