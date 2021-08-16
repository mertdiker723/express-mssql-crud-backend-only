const dotenv = require('dotenv');
dotenv.config({
    path: "./config.env"
});


const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        instancename: process.env.DB_INS
    },
    port: 1433
}

module.exports = config;