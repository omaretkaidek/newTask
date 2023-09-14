const FileModel = require('../model/FileModel');
const fs = require('fs').promises; // Using promises for async/await compatibility
const path = require('path');

module.exports = {
    uploadFile: async (data, file, apartmentId) => {
        try {
            // Define the new file name and locatio
            const newFileName = `${Date.now()}_${data.originalname}`;
            let rootDir = path.join(__dirname, '../../../');
            const storagePath = path.join(rootDir, `uploads/${file}`, newFileName);
            // Move the file from the temp location to our desired location
            await fs.rename(data.path, storagePath);

            // Insert the file metadata into the database
            const fileData = {
                old_name: data.originalname,
                new_name: newFileName,
                folder: file,
                path: storagePath
            };
            const fileId = await FileModel.createFileEntry(fileData);

            if (apartmentId) {
                // If an apartment ID is provided, associate the file with the apartment
                await FileModel.associateWithApartment(apartmentId, fileId);
            }

            return fileId;

        } catch (error) {
            throw new Error('Error during file upload: ' + error.message);
        }
    },

    getFileById: async (id) => {
        try {
            const file = await FileModel.getFileEntryById(id);
            if (!file) {
                throw new Error('File not found');
            }
            return file;

        } catch (error) {
            throw new Error('Error fetching file by ID: ' + error.message);
        }
    },

    deleteFileById: async (id) => {
        try {
            // Get the file entry from the database
            const file = await FileModel.getFileEntryById(id);

            // Delete the file from the filesystem
            await fs.unlink(file.path);

            // Delete the file entry from the database
            await FileModel.deleteFileEntryById(id);

            return true;

        } catch (error) {
            throw new Error('Error deleting file: ' + error.message);
        }
    },
};
