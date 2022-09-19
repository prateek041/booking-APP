import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createError } from '../utils/error.js'

// Here we will create a user.
export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt); // encrypt the password

        const newUser = new User({ // create a new user.
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save(); // save it in the database.
        res.status(200).json("user created");
    } catch (error) {
        next(error);
    }
}

// we will create a token when the user logs in to the website.
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username }); // firstly find if the user is present in DB.
        if (!user) return next(createError(404, "user not found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "incorrect username or password"));

        // since the user is authenticated, we will perform authorization.
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT) // we will take these two unique and important information and encrypt using a secret key.

        // removing unwanted details.
        const { password, isAdmin, ...otherDetails } = user._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true, // no client script reached the server.
            })
            .status(200)
            .json({ ...otherDetails });
    } catch (error) {
        next(error);
    }
}