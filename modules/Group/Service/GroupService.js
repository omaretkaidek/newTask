// groupService.js

const GroupModel = require('../model/GroupModel');
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root1234',
        database: 'task1'
    }
});

const GroupService = {
    async registerGroup(groupData) {
        const newGroup = await GroupModel.createGroup(groupData);

        return newGroup;
    },

    async getGroupById(groupId) {
        return await GroupModel.getGroupById(groupId);
    },

    async updateGroupById(groupId, updatedData) {
        return await GroupModel.updateGroupById(groupId, updatedData);
    },

    async deleteGroupById(groupId) {
        return await GroupModel.deleteGroupById(groupId);
    },

    async createGroup(groupData, permissions) {
        const trx = await knex.transaction();
    
        try {
            await trx('Group').insert(groupData);
            const [row] = await trx.raw('SELECT LAST_INSERT_ID() as id');
            const groupId = row[0].id;

    
            const groupPermissionsData = permissions.map(permissionId => {
                return {
                    GroupID: groupId,
                    PermissionID: permissionId
                };
            });
    
            await trx('GroupPermissions').insert(groupPermissionsData);
            
            await trx.commit();
    
            return groupId;
        } catch (error) {
            await trx.rollback();
            throw error;
        }
    }
};

module.exports = GroupService;
