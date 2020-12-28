const BookRating = require('../models/bookRatings');

class BookRatingService {
    static async addBookRating({
        bookId,
        name,
        comment,
        rating
    }) {
        try {
            const result = await BookRating.query().insert({bookId, name, comment, rating});
            return result;
        } catch (err) {
            throw new Error("Failed to add new Book Rating");
        }
    }

    static async getBookRating(bookId) {
        try {
            const result = await BookRating.query().select("*").where("bookId", bookId);
            return result;
        } catch (err) {
            throw new Error("Failed to get Book Rating");
        }
    }
}

module.exports = BookRatingService;