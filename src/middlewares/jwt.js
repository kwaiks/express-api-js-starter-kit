const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        next()
    } catch (err) {
        res.sendStatus(403);
    }
}

const refreshToken = (token) => {
    try {
        const tokenData = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
        const newToken = jwt.sign({
            data: tokenData.data
        }, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: "15m"
        });
        return newToken;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    verifyToken,
    refreshToken
}