const { Router } = require('express');
const authRoute = require('./auth');
const bookRoute = require('./book');
const bookRatingRoute = require('./bookRating');
const userRoute = require('./user');

const router = Router();

router.get("/", (_req,res) => {
    res.sendStatus(200);
});

router.use(authRoute);
router.use(userRoute);
router.use(bookRoute);
router.use(bookRatingRoute);

module.exports = router;