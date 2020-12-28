const { Model } = require('objection');

class Books extends Model {
    // Define all columns so we can easily access it
    bookId;
    bookName;
    bookYear;
    bookAuthor;
    bookDescription;
    createdBy;
    updatedAt;

    // Update updated_at column every time row updated
    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    // if primary column isn't id
    static idColumn = "bookId";

    // Table Name
    static tableName = "book";

    // Optional JSON Schema for validation
    static jsonSchema = {
        type: "object",
        required: ["bookName", "bookYear", "bookAuthor"], // not null column
        properties: { // data type
            bookId: { type: ["string", "number"] },
            bookName: { type: "string" },
            bookYear: { type: "number" },
            bookAuthor: { type: "string" },
            bookDescription: { type: "string" }
        }
    }

    // Define table relation for easier query
    static relationMappings = {
        ratings: {
            relation: Model.HasManyRelation,
            modelClass: require('./bookRatings'),
            join: {
                from: "book.bookId",
                to: "bookRating.bookId"
            }
        }
    }

}

module.exports = Books;