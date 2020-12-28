const { Model } = require('objection');

class User extends Model {
    // Define all columns so we can easily access it
    id;
    name;
    username;
    email;
    password;
    updatedAt;

    // Update updated_at column every time row updated
    $beforeUpdate() {
        this.updatedAt = new Date();
    }

    // Table Name
    static tableName = "user";

    // Optional JSON Schema for validation
    static jsonSchema = {
        type: "object",
        required: ["email", "username", "password"], // not null column
        properties: { // data type
            id: { type: "number" },
            email: { type: "string" },
            password: { type: "string" },
            username: { type: "string" },
            name: { type: "string" }
        }
    }

    // Modifiers
    static modifiers = {
        searchByEmail(query, email) {
            query.select("*").where("email", email).first();
        }
    }
}

module.exports = User;