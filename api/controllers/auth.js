import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        console.log(req.body.password);

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        const user = await newUser.save();
        res.status(200).json({ message: "User has been created.", user });
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const username = req.body.username;  // Extract username from request
        console.log('Login attempt for username:', username);

        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found:', username);
            return next(createError(404, "User not found!"));
        }

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!isPasswordCorrect) {
            console.log('Incorrect password for username:', username);
            return next(createError(400, "Wrong password or username!"));
        }

        const token = await jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        const { password, isAdmin, ...otherDetails } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        });
        res.status(200).json({ ...otherDetails });
    } catch (err) {
        console.error('Error during login:', err);
        next(err);
    }
};

