const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/users');

class UserService {
    static async login(email, password) {
        try {
            const user = await User.query().modify('searchByEmail', email);
            if (!user) {
                throw new Error("User Not Found");
            }
            const passwordValidated = await bcrypt.compare(password, user.password);
            if (!passwordValidated){ //check password
                throw new Error("Password Incorrect");
            };
            const token = jwt.sign({
                data: {
                    email: user.email,
                    username: user.username,
                    name: user.name
                }
            }, process.env.ACCESS_TOKEN_KEY, {
                expiresIn: "15m"            // short lived token
            });
            const refreshToken = jwt.sign({
                data: {
                    email: user.email
                }
            }, process.env.REFRESH_TOKEN_KEY, {
                expiresIn: "7d"             // to acquire new access token
            });
            return {
                token,
                refreshToken
            }
        } catch (err) {
            console.log(err);
            throw new Error("Login Failed");
        }
    }

    static async addUser({email, password, name, username}) {
        try {
            password = await bcrypt.hash(password, 5); // dont forget to store hashed password
            const user = await User.query().insert({email, password, name, username}).returning("id");
            return user;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    static async getUser(id) {
        try {
            const user = await User.query().select(["id","name","username","email"]).where("id", Number(id)).first();
            return user;
        } catch (err) {
            throw new Error("Failed to get User");
        }
    }

    static async editUser(id, {username, name}) {
        try {
            const user = await User.query().patch({username, name}).where("id", id);
            return user;
        } catch (err) {
            throw new Error("Cannot edit User");
        }
    }

    static async removeUser(id) {
        try {
            await User.query().deleteById(id);
            return { success: true };
        } catch (err) {
            throw new Error("Failed to remove user");
        }
    }
}

module.exports = UserService;