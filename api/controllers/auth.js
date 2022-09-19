import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { createError } from '../utils/error.js'


export const register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })

        await newUser.save();
        res.status(200).json("user created");
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username }); // firstly find if the user is present in DB.
        if (!user) return next(createError(404, "user not found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "incorrect username or password"));

        res.status(200).json({
            status: "success",
            back: user,
        })
    } catch (error) {
        next(error);
    }
}