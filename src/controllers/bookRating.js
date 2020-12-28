const { Router } = require('express');
const { bookRatingValidator, validate } = require('../middlewares/validator');
const { verifyToken } = require('../middlewares/jwt');
const BookRatingService = require('../services/bookRatingService');

const router = Router();

router.use(verifyToken);

router.post("/book-rating", bookRatingValidator(), validate, async (req, res) => {
    const book = req.body;
    try {
        const result = await BookRatingService.addBookRating(book);
        res.json(result);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.get("/book-rating/:bookId", async (req, res) => {
    const { bookId } = req.params;
    try {
        const result = await BookRatingService.getBookRating(bookId);
        res.json(result);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;