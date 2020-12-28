const { Router } = require('express');
const { UniqueViolationError } = require('objection');
const { loginValidator, validate, userValidator } = require('../middlewares/validator');
const { refreshToken } = require('../middlewares/jwt');
const UserService = require('../services/userService');

const router = Router();

router.post("/login", loginValidator(), validate, async (req,res) => {
    const { email, password } = req.body;
    try {
        const result = await UserService.login(email, password);
        res.json(result);
    } catch (err) {
        res.send({
            status: 404,
            message: "User not found"
        })
    }
});

router.post("/register", userValidator(), validate, async(req,res) => {
    const user = req.body;
    try {
        const result = await UserService.addUser(user);
        res.json(result);
    } catch (err) {
        if (err instanceof UniqueViolationError){
            return res.status(200).json({
                status: 202,
                message: "Email has been used"
            })
        }
        res.sendStatus(500);
    }
});

router.post("/refresh", async (req,res) => {
    const { token } = req.body;
    try {
        const newToken = refreshToken(token);
        res.json({
            token: newToken
        });
    } catch (err){
        res.send({
            status: 403,
            message: "Token Expired"
        })
    }
});

module.exports = router;