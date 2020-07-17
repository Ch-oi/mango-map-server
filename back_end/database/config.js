const knexfile = require('./knexfile')
const knex = require('knex')(knexfile['development'])

const setup = async () => {
    await knex.migrate.rollback([{ directory: '../database/migrations' }])
    await knex.migrate.latest([{ directory: '../database/migrations' }])
    await knex.seed.run([{ directory: '../database/seeds' }])
}

module.exports = knex
