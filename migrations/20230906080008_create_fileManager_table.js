/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('File', function(table) {
      table.increments('file_id').primary();
      table.string('old_name').notNullable();
      table.string('new_name').notNullable().unique();
      table.string('folder').notNullable();
      table.string('path').notNullable().unique();  // Assuming the path should be unique
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('File');
  };
