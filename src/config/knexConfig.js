// convert Snake Case from db into Camel Case
const { knexSnakeCaseMappers } = require('objection');
const { DB_NAME, DB_PASS, DB_USER } = require('./config');

module.exports = {
    client: "pg",
    connection: {
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASS
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: __dirname + "/db/migrations",
        tableName: "express_js_migrations" // change into your liking
    },
    seeds: {
        directory: __dirname + "/db/seeds"
    },
    ...knexSnakeCaseMappers()
}
