const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // dummy password
  const userPassword = await bcrypt.hash("test1234", 5);
  // Deletes ALL existing entries
  await knex('user').del();
  await knex('user').insert({
    username: "kwaiks",
    email: "test@test.com",
    password: userPassword,
    name: "User Test"
  });
};
