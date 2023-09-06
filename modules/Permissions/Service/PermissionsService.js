// permissionsService.js

const PermissionsModel = require('../model/PermissionsModel');

// If you have an email service or other services, you'd also import them here
// const EmailService = require('./emailService');

const PermissionsService = {
    async registerPermission(permissionData) {
        const newPermission = await PermissionsModel.createPermission(permissionData);

        return newPermission;
    },

    async getPermissionById(permissionId) {
        return await PermissionsModel.getPermissionById(permissionId);
    },

    async updatePermissionById(permissionId, updatedData) {
        return await PermissionsModel.updatePermissionById(permissionId, updatedData);
    },

    async deletePermissionById(permissionId) {
        return await PermissionsModel.deletePermissionById(permissionId);
    },

};

module.exports = PermissionsService;
