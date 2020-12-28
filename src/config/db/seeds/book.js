
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bookRating').del();
  await knex('book').del();
  
  const book = await knex('book').insert({
    bookAuthor: "An Author",
    bookName: "A Book",
    bookYear: 1993,
    bookDescription: "This is a book"
  }).returning("bookId");

  console.log(book[0])

  await knex('bookRating').insert([{
    bookId: book[0],
    comment: "Good Book",
    name: "User A",
    rating: 8
  },
  {
    bookId: book[0],
    comment: "Great Book",
    name: "User B",
    rating: 10
  }])
};
