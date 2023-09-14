const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root1234',
        database: 'task1'
    }
});

module.exports = {
    createFileEntry: async (data) => {
        try {
            const fileId = await knex('FileManager').insert(data).returning('file_id'); 
            // Note: .returning() might not work with MySQL; you might need to do a separate query to get the ID
            return fileId[0];
        } catch (error) {
            throw new Error('Error inserting file entry: ' + error.message);
        }
    },

    getFileEntryById: async (id) => {
        try {
            const file = await knex('FileManager').where('file_id', id).first();
            if (!file) {
                throw new Error('File not found');
            }
            return file;
        } catch (error) {
            throw new Error('Error fetching file by ID: ' + error.message);
        }
    },

    deleteFileEntryById: async (id) => {
        try {
            const rowsDeleted = await knex('FileManager').where('file_id', id).delete();
            if (rowsDeleted === 0) {
                throw new Error('File not found or already deleted');
            }
            return true;
        } catch (error) {
            throw new Error('Error deleting file entry: ' + error.message);
        }
    },

    associateWithApartment: async (apartmentId, fileId) => {
        // Insert into ApartmentImages table
        return knex('ApartmentImages').insert({
            apartment_id: apartmentId,
            image_id: fileId
        });
    }
};
