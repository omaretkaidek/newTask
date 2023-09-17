/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Users', function(table) {
      table.increments('id').primary();
      table.string('Username').notNullable().unique();
      table.string('FirstName').notNullable();
      table.string('LastName').notNullable();
      table.string('Email').notNullable().unique();
      table.string('Password').notNullable();
      table.string('profile_photo_id');
    });
  };
  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Users');
  };
  
