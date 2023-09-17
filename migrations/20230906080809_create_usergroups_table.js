/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('UserGroups', function(table) {
      table.integer('UserID').unsigned();
      table.integer('GroupID').unsigned();
      table.primary(['UserID', 'GroupID']); // Composite primary key

      // Setting up foreign key references
      table.foreign('UserID').references('id').inTable('Users');
      table.foreign('GroupID').references('id').inTable('Group');
  });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('UserGroups');
  };
