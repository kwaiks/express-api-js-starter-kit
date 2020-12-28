const { Model } = require('objection');

class BookRatings extends Model {
    // Define all columns so we can easily access it
    id;
    bookId;
    name;
    ratings;
    comment;

    // Table Name
    static tableName = "bookRating";
}

module.exports = BookRatings;