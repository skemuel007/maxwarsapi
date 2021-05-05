const config = require('config');

const dbPass = config.get('dbPass');
const dbHost = config.get('dbHost');
const dbName = config.get('dbName');
const dbUser = config.get('dbUser');

module.exports = {
    HOST: dbHost,
    USER: dbUser,
    PASSWORD: dbPass,
    DB: dbName,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
