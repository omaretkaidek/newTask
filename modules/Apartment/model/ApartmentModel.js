// apartmentModel.js

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root1234',
        database: 'task1'
    }
});

const tableName = 'Apartment';

const ApartmentModel = {
    async createApartment(apartmentData) {
        return await knex(tableName).insert(apartmentData).returning('*');
    },

    async getApartmentById(id) {
        return await knex(tableName).where({ id }).first();
    },

    async updateApartmentById(id, updatedData) {
        return await knex(tableName).where({ id }).update(updatedData).returning('*');
    },

    async deleteApartmentById(id) {
        return await knex(tableName).where({ id }).del();
    },

    async idApartmentExists(id) {
        const apartment = await knex(tableName).where({ id }).first();
        return Boolean(apartment);
    },

    async nameExists(name) {
        const apartment = await knex(tableName).where({ name }).first();
        return Boolean(apartment); 
    },
};

module.exports = ApartmentModel;