// neighbourhoodService.js

const NeighbourhoodModel = require('../model/NeighbourhoodModel');

// If you have an email service or other services, you'd also import them here
// const EmailService = require('./emailService');

const NeighbourhoodService = {
    async registerNeighbourhood(neighbourhoodData) {
        const newNeighbourhood = await NeighbourhoodModel.createNeighbourhood(neighbourhoodData);

        return newNeighbourhood;
    },

    async getNeighbourhoodById(neighbourhoodId) {
        return await NeighbourhoodModel.getNeighbourhoodById(neighbourhoodId);
    },

    async updateNeighbourhoodById(neighbourhoodId, updatedData) {
        return await NeighbourhoodModel.updateNeighbourhoodById(neighbourhoodId, updatedData);
    },

    async deleteNeighbourhoodById(neighbourhoodId) {
        return await NeighbourhoodModel.deleteNeighbourhoodById(neighbourhoodId);
    },

};

module.exports = NeighbourhoodService;
