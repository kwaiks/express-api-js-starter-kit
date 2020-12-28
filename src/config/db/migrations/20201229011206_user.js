
exports.up = async function(knex) {
    return await knex.schema.createTable("user", t => {
        t.bigIncrements("id").primary().unsigned().notNullable();
        t.string("name");
        t.string("email").unique();
        t.string("password");
        t.string("username");
        t.timestamp("createdAt").defaultTo(knex.fn.now());
        t.timestamp("updatedAt");
    });
};

exports.down = async function(knex) {
  return await knex.schema.dropTable('user');
};
