/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Apartment', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.integer('number_of_bedrooms').unsigned().notNullable();
      table.decimal('rent_amount', 14, 2).notNullable(); // Assuming rent_amount as a decimal with 2 decimal places
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Apartment');
  };
