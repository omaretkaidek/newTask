// permissionsModel.js

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root1234',
        database: 'task1'
    }
});

const tableName = 'Permissions';

const PermissionsModel = {
    async createPermission(permissionsData) {
        return await knex(tableName).insert(permissionsData).returning('*');
    },

    async getPermissionById(id) {
        return await knex(tableName).where({ id }).first();
    },

    async updatePermissionById(id, updatedData) {
        return await knex(tableName).where({ id }).update(updatedData).returning('*');
    },

    async deletePermissionById(id) {
        return await knex(tableName).where({ id }).del();
    },

    async idPermissionExists(id) {
        const permissions = await knex(tableName).where({ id }).first();
        return Boolean(permissions); 
    },

    async namePermissionExists(name) {
        const permissions = await knex(tableName).where({ name }).first();
        return Boolean(permissions);
    },
};

module.exports = PermissionsModel;