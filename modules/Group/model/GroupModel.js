// groupModel.js

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root1234',
        database: 'task1'
    }
});

const tableName = 'Group';

const GroupModel = {
    async createGroup(groupData) {
        return await knex(tableName).insert(groupData).returning('*');
    },

    async getGroupById(id) {
        return await knex(tableName).where({ id }).first();
    },

    async updateGroupById(id, updatedData) {
        return await knex(tableName).where({ id }).update(updatedData).returning('*');
    },

    async deleteGroupById(id) {
        return await knex(tableName).where({ id }).del();
    },

    async idGroupExists(id) {
        const group = await knex(tableName).where({ id }).first();
        return Boolean(group);
    },

    async nameGroupExists(name) {
        const group = await knex(tableName).where({ name }).first();
        return Boolean(group); 
    },
};

module.exports = GroupModel;