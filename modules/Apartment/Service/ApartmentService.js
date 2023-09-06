// apartmentService.js

const ApartmentModel = require('../model/ApartmentModel');

const ApartmentService = {
    async registerApartment(apartmentData) {
        const newApartment = await ApartmentModel.createApartment(apartmentData);

        return newApartment;
    },

    async getApartmentById(apartmentId) {
        return await ApartmentModel.getApartmentById(apartmentId);
    },

    async updateApartmentById(apartmentId, updatedData) {
        return await ApartmentModel.updateApartmentById(apartmentId, updatedData);
    },

    async deleteApartmentById(apartmentId) {
        return await ApartmentModel.deleteApartmentById(apartmentId);
    },

};

module.exports = ApartmentService;
