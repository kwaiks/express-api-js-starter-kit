const { Router } = require('express');
const { userValidator, validate } = require('../middlewares/validator');
const { verifyToken } = require('../middlewares/jwt');
const UserService = require('../services/userService');

const router = Router();

router.use(verifyToken); // JWT Verification

router.get("/user/:userId", async (req,res) => {
    const { userId } = req.params;
    try {
        const result = await UserService.getUser(userId);
        res.json(result);
    } catch (err) {
        res.sendStatus(500);
    }
});

router.put("/user/:userId", userValidator(), validate, async (req,res) => {
    const { userId } = req.params;
    const user = req.body;
    try {
        await UserService.editUser(userId, user);
        res.json({
            status: 201,
            message: "User has been edited"
        });
    } catch (err) {
        res.sendStatus(500);
    }
});

router.delete("/user/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        await UserService.removeUser(userId);
        res.json({
            status: 200,
            message: "Success remove user"
        });
    } catch (err) {
        res.sendStatus(500);
    }
})

module.exports = router;