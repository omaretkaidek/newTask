/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('ApartmentImages', function(table) {
      table.integer('apartment_id').unsigned().references('id').inTable('Apartment');
      table.integer('image_id').unsigned().references('file_id').inTable('File');
      table.primary(['apartment_id', 'image_id']); // Composite primary key
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('ApartmentImages');
  };
