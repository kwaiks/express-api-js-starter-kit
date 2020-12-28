const { Router } = require('express');
const { bookValidator, validate } = require('../middlewares/validator');
const { verifyToken } = require('../middlewares/jwt');
const BookService = require('../services/bookService');

const router = Router();

router.use(verifyToken);

router.get("/book-detail/:bookId", async(req,res) => {
    const { bookId } = req.params;
    try {
        const result = await BookService.getBookDetail(bookId);
        res.json(result);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.get("/book", async (req,res) => {
    const { page, size } = req.query;
    try {
        const result = await BookService.getAllBookByPage(Number(page), Number(size));
        res.json(result);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.post("/book", bookValidator(), validate, async (req, res) => {
    const book = req.body;
    try {
        const result = await BookService.addBook(book);
        res.json(result);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.delete("/book/:bookId", async (req, res) => {
    const { bookId } = req.params;
    try {
        await BookService.removeBook(bookId);
        res.json({
            status: 200,
            message: "Book has been removed"
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.put("/book/:bookId", bookValidator(), validate, async (req,res) => {
    const { bookId } = req.params;
    const book = req.body;
    try {
        const result = await BookService.editBook(Number(bookId), book);
        res.json(result);
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;