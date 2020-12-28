const knex = require('knex');
const config = require('./knexConfig');

module.exports = knex(config);