/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('GroupPermissions', function(table) {
      table.integer('GroupID').unsigned().references('id').inTable('Group');
      table.integer('PermissionID').unsigned().references('id').inTable('Permissions');
      table.primary(['GroupID', 'PermissionID']); // Composite primary key
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('GroupPermissions');
  };
