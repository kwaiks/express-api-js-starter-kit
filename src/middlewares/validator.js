const { body, validationResult } = require('express-validator');

const loginValidator = () => [
    body("email").isString().notEmpty().withMessage("Email should be string and not empty"),
    body("password").isString().notEmpty()
];

const userValidator = () => [
    body("email").isString().optional(),
    body("name").isString(),
    body("password").isString().optional(),
    body("username").isString()
];

const bookValidator = () => [
    body("bookName").isString(),
    body("bookAuthor").isString(),
    body("bookYear").isNumeric(),
    body("bookDescription").isString()
];

const bookRatingValidator = () => [
    body("bookId").isNumeric(),
    body("comment").isString(),
    body("rating").isNumeric(),
    body("name").isString()
]

const validate = (req, res, next) => {
    const errors = validationResult(req);
    // check validated
    if (errors.isEmpty()) return next();

    // map errors from validation
    // send error response
    const extractedErrors = {};
    errors.array().map((err) => extractedErrors[err.param] = err.msg);
    return res.status(422).json({
        validationError: extractedErrors
    });
};

module.exports = {
    validate,
    loginValidator,
    userValidator,
    bookRatingValidator,
    bookValidator
}