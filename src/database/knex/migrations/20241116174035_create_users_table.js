exports.up = knex => {
  return knex.schema.createTable("users", table => {
    table.increments("id").primary();
    table.string("name");
    table.string("email").unique();
    table.string("password").notNullable();
    table.string("avatar");
    table.boolean("isAdmin").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = knex => {
  return knex.schema.dropTable("users");
};
