// neighbourhoodModel.js

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root1234',
        database: 'task1'
    }
});

const tableName = 'Neighbourhood';

const NeighbourhoodModel = {
    async createNeighbourhood(neighbourhoodData) {
        return await knex(tableName).insert(neighbourhoodData).returning('*');
    },

    async getNeighbourhoodById(id) {
        return await knex(tableName).where({ id }).first();
    },

    async updateNeighbourhoodById(id, updatedData) {
        return await knex(tableName).where({ id }).update(updatedData).returning('*');
    },

    async deleteNeighbourhoodById(id) {
        return await knex(tableName).where({ id }).del();
    },

    async idNeighbourhoodExists(id) {
        const neighbourhood = await knex(tableName).where({ id }).first();
        return Boolean(neighbourhood); 
    },

    async nameNeighbourhoodExists(name) {
        const neighbourhood = await knex(tableName).where({ name }).first();
        return Boolean(neighbourhood);
    },
};

module.exports = NeighbourhoodModel;