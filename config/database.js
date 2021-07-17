const { createPool } = require('mysql');

const pool = createPool({
    // Deploy
    // port: process.env.DB_PORT||8889,
    // host: process.env.DB_HOST||"127.0.0.1",
    // user: process.env.DB_USER||"root",
    // password: process.env.DB_PASS||"root",
    // database: process.env.MYSQL_DB||"AaqlFWLEt4",

    // develop
    port: 8889,
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "AaqlFWLEt4",

    connectionLimit: 100,
});

module.exports = pool;