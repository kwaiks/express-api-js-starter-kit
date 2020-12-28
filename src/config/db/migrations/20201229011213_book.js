
exports.up = async function(knex) {
    await knex.schema.createTable('book', t => {
        t.bigIncrements("bookId").primary().unsigned();
        t.string("bookAuthor");
        t.integer("bookYear");
        t.string("bookName");
        t.string("bookDescription");
        t.timestamp("createdAt").defaultTo(knex.fn.now());
        t.timestamp("updatedAt");
    });
    await knex.schema.withSchema('public').createTable('bookRating', t => {
        t.bigIncrements("id").primary().unsigned();
        t.bigInteger("bookId").unsigned().references('bookId').inTable('book');
        t.string("comment");
        t.string("name");
        t.integer("rating");
        t.timestamp("createdAt").defaultTo(knex.fn.now());
    });
};

exports.down = async function(knex) {
    await knex.schema.dropTable('bookRating');
    return await knex.schema.dropTable('book');
};
