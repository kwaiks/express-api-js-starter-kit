module.exports = {
    DB_NAME: process.env.DB_NAME? process.env.DB_NAME : 'express',
    DB_PASS: process.env.DB_PASS? process.env.DB_PASS : 'alex02',
    DB_USER: process.env.DB_USER? process.env.DB_USER : 'postgres'
}