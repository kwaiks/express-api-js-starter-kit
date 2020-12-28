const Book = require('../models/books');

class BookService {
    static async addBook({
        bookName,
        bookAuthor,
        bookYear,
        bookDescription
    }) {
        try {
            const book = await Book.query().insert({
                bookName,
                bookAuthor,
                bookDescription,
                bookYear
            });
            return book.bookId;
        } catch (err) {
            console.log(err)
            throw new Error("Failed to create Book")
        }
    }

    static async getAllBookByPage(page, size) {
        try {
            const result = Book.query().select("*").page(page, size);
            return result;
        } catch (err) {
            throw new Error(`Failed to get All Books at page ${page}`)
        }
    }

    static async getBookDetail(id) {
        try {
            const result = Book.query().select("*")
                                        .where("bookId", id)
                                        .withGraphFetched("ratings") // get book ratings too
                                        .first()
            return result;
        } catch (err) {
            throw new Error("Failed to get book detail");
        }
    }

    static async editBook(id, {bookAuthor, bookDescription, bookName, bookYear}) {
        try {
            const result = Book.query().patch({
                bookAuthor,
                bookDescription,
                bookName,
                bookYear
            }).where("bookId", id);
            return result;
        } catch (err) {
            throw new Error("Failed to edit book");
        }
    }

    static async removeBook(id) {
        try {
            await Book.query().del().where("bookId", id);
            return { success: true }
        } catch (err) {
            throw new Error("Failed to remove book");
        }
    }
}

module.exports = BookService;