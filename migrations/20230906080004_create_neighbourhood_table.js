/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Neighbourhood', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('city').notNullable();
      table.string('country').notNullable();
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Neighbourhood');
  };
