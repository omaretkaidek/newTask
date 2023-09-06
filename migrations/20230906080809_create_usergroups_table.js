/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('UserGroups', function(table) {
      table.integer('UserID').unsigned().references('id').inTable('Users');
      table.integer('GroupID').unsigned().references('id').inTable('Group');
      table.primary(['UserID', 'GroupID']); // Composite primary key
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('UserGroups');
  };
